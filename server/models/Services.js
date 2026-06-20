import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for your service"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a detailed description"],
      minlength: [20, "Description should be at least 20 characters"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: [
        "Electrical",
        "Plumbing",
        "Cleaning",
        "Moving",
        "Painting",
        "Gardening",
        "Other",
      ],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: [String],
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    priceType: {
      type: String,
      enum: ["fixed", "hourly"],
      default: "hourly",
    },
    location: {
      type: String,
      required: true,
    },
    tags: [String],
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Service", serviceSchema);
