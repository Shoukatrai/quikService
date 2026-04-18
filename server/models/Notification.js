import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      enum: ["booking", "message", "system"],
      default: "booking",
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
