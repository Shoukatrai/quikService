import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller", 
      required: true,
    },
    docType: {
      type: String,
      required: true,
      enum: ["National ID Card", "Passport", "Driver's License"],
    },
    docNumber: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String, 
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNote: {
      type: String, 
      default: "",
    },
  },
  { timestamps: true },
);

verificationSchema.index({ seller: 1 }, { unique: true });

export default mongoose.model("Verification", verificationSchema);
