import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    gig: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
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
    // NEW: Payment Details
    paymentMethod: {
      type: String,
      enum: ["cod", "card"],
      default: "cod",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    address: {
      house: { type: String, required: true },
      area: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
    },
    requirements: {
      type: String,
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    serviceFee: {
      type: Number,
      default: 2.5,
    },
    status: {
      type: String,
      enum: ["pending", "active", "completed", "cancelled"],
      default: "pending",
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
