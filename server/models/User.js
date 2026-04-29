import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    authSource: {
      type: String,
      default: "email",
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["client", "seller", "admin"],
      default: "client",
    },
    avator: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    ProfilePicture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
