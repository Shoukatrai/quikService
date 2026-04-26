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
      address, // frontend se 'address' object aa raha hai
      requirements,
      serviceName,
      totalAmount, // Frontend se receive karein
      serviceFee, // Frontend se receive karein
    } = req.body;

    // 1. Payment Status Logic
    const paymentStatus = paymentMethod === "cod" ? "pending" : "paid";

    // 2. Create Booking Object
    const bookObj = {
      gig: gigId,
      client: userId,
      seller: sellerId,
      paymentMethod,
      paymentStatus,
      address, // Schema mein humne 'shippingAddress' rakha tha
      requirements,
      totalAmount,
      serviceFee: serviceFee || 2.5,
      status: "pending",
      serviceName,
    };
    console.log("bookObj", bookObj);

    const newBooking = await Booking.create(bookObj);
    console.log("newBooking", newBooking);

    const sellerDoc = await Seller.findById(sellerId);
    if (!sellerDoc) {
      return res.status(404).json({ message: "Seller not found" });
    }
    const sellerUserId = sellerDoc.userId;

    const targetRoom = sellerUserId.toString().trim();
    const activeRooms = io.sockets.adapter.rooms;
    const isSellerOnline = activeRooms.has(targetRoom);

    if (isSellerOnline) {
      io.to(targetRoom).emit("notification_request", {
        type: "New Booking",
        message: `You have a new booking request for ${serviceName}`,
        booking: newBooking,
      });
    }
    const notifiction = await Notification.create({
      recipient: sellerUserId,
      sender: userId,
      type: "booking",
      title: "New Booking Request",
      message: `New booking request for ${serviceName}`,
      isRead: false,
      bookingId: newBooking._id,
    });

    console.log("notifiction", notifiction);
    // 7. Final Response
    res.status(201).json({
      success: true,
      message: "Booking request sent successfully!",
      data: newBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getALLBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const seller = await Seller.findOne({ userId });
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
    const bookings = await Booking.find({ client: userId }).populate("seller").populate("gig");
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
