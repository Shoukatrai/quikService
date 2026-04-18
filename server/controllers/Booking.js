import { io } from "../app.js";
import Booking from "../models/Booking.js";
import Seller from "../models/Seller.js";

export const bookService = async (req, res) => {
  try {
    const userId = req.user._id;
    const { sellerId, date, time, address, note } = req.body;
    const bookObj = {
      client: userId,
      seller: sellerId,
      serviceDetails: {
        date,
        time,
        address,
        note,
      },
      status: "pending",
    };

    
    const response = await Booking.create(bookObj);
    const seller = await Seller.findById(sellerId);
    const sellerUserId = seller.userId;
    console.log("seller", sellerUserId);
    const activeRooms = io.sockets.adapter.rooms;
    console.log("Current Active Rooms:", Array.from(activeRooms.keys()));

    const targetRoom = sellerUserId.toString().trim();
    const isSellerOnline = activeRooms.has(targetRoom);
    console.log("seller id", targetRoom);
    console.log("online seller", isSellerOnline);
    if (isSellerOnline) {
      io.to(targetRoom).emit("notification_request", {
        type: "New Booking",
        message: `New booking request from ${userId}`,
        booking: response,
      });
    }

    res.status(201).json({
      message: "Booking request sent successfully!",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
