import mongoose from "mongoose";
const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      maxlength: 500,
    },
    phoneNumber: { type: String },
    profilePicture: { type: String , default: "https://cdn-icons-png.flaticon.com/512/149/149071.png" },
    category: {
      type: String,
      required: true,
      enum: [
        "Plumbing",
        "Electrical",
        "Cleaning",
        "Tutoring",
        "Handyman",
        "Other",
      ],
    },
    skills: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    verificationDocuments: [
      {
        docType: { type: String },
        fileUrl: { type: String },
        docNumber:{ type: String },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
    ],
    yearsOfExperience: { type: Number, min: 0 },
    location: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    serviceRadius: {
      type: Number,
      default: 10,
    },
    pricing: {
      type: { type: String, enum: ["hourly", "fixed"], default: "hourly" },
      rate: { type: Number, required: true },
      currency: { type: String, default: "USD" },
    },
    availability: {
      type: String,
      enum: ["available", "onbreak"],
      default: "available",
    },
    stats: {
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
      jobsCompleted: { type: Number, default: 0 },
      responseTime: { type: Number },
    },

    portfolio: [
      {
        imageUrl: String,
        title: String,
        description: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Seller", sellerSchema);
