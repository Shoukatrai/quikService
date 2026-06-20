import { io } from "../app.js";
import Notification from "../models/Notification.js";
import Seller from "../models/Seller.js";
import Booking from "../models/Booking.js";
export const bookService = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      gigId,
      sellerId,
      paymentMethod,
      address,
      requirements,
      serviceName,
      totalAmount,
      serviceFee,
    } = req.body;

    console.log("Booking Request Data:", req.body);
    const paymentStatus = paymentMethod === "cod" ? "pending" : "paid";

    const bookObj = {
      gig: gigId,
      client: userId,
      seller: sellerId,
      paymentMethod,
      paymentStatus,
      address,
      requirements,
      totalAmount,
      serviceFee: serviceFee || 2.5,
      status: "pending",
      serviceName,
    };
    console.log("bookObj", bookObj);

    const newBooking = await Booking.create(bookObj);
    console.log("newBooking", newBooking);

    // const sellerDoc = await Seller.findById(sellerId);
    // console.log("sellerDoc", sellerDoc);
    // if (!sellerDoc) {
    //   return res.status(404).json({ message: "Seller not found" });
    // }
    // const sellerUserId = sellerDoc.userId;

    // const targetRoom = sellerUserId.toString().trim();
    // const activeRooms = io.sockets.adapter.rooms;
    // const isSellerOnline = activeRooms.has(targetRoom);

    // if (isSellerOnline) {
    //   io.to(targetRoom).emit("notification_request", {
    //     type: "New Booking",
    //     message: `You have a new booking request for ${serviceName}`,
    //     booking: newBooking,
    //   });
    // }
    // const notifiction = await Notification.create({
    //   recipient: sellerUserId,
    //   sender: userId,
    //   type: "booking",
    //   title: "New Booking Request",
    //   message: `New booking request for ${serviceName}`,
    //   isRead: false,
    //   bookingId: newBooking._id,
    // });

    // console.log("notifiction", notifiction);
    res.status(201).json({
      success: true,
      message: "Booking request sent successfully!",
      data: newBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getALLBookings = async (req, res) => {
  try {
    console.log("Fetching all bookings for seller:", req.user._id);
    const userId = req.user._id;
    const seller = await Seller.findOne({ user: userId });
    console.log("seller", seller);
    const bookings = await Booking.find({ seller: seller }).populate("client");
    console.log("bookings", bookings);

    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully!",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("Fetching bookings for user:", userId);
    const bookings = await Booking.find({ client: userId })
      .populate("seller")
      .populate("gig");
    console.log("bookings", bookings);
    console.log("bookings length", bookings.length);
    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully!",
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookingId = req.params.bookingId;
    const { status } = req.body;
    const updateStatus = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      { status },
    ).populate("client");
    if (!updateStatus) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const clientUserId = updateStatus.client._id.toString().trim();

    console.log("clientUserId", clientUserId);
    console.log("updateStatus", updateStatus?.client);
    const activeRooms = io.sockets.adapter.rooms;
    if (activeRooms.has(clientUserId)) {
      io.to(clientUserId).emit("booking_status_updated", {
        bookingId: updateStatus._id,
        status: updateStatus.status,
        message: `Your booking for ${updateStatus?.serviceName || updateStatus?._id} has been ${status}.`,
      });
    }

    res.status(201).json({
      message: "Booking status Updated",
    });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({
      message: "Status Update Error!",
    });
  }
};
