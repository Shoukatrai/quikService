import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller", 
    required: true,
  },
  serviceDetails: {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    address: { type: String, required: true },
    note: { type: String },
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed"],
    default: "pending",
  },
  totalAmount: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);