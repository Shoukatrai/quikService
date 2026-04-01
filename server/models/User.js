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
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
