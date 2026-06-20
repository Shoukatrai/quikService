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
      default: "https://identity.getpostman.com/client-auth/confirm?auth_challenge=ff8e17965b4229b40d183c33fa3c720079d4375e839c8ea7bb8320dc90f4ea3d&auth_device=app_native&auth_device_version=11.71.7",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
