import Post from "../models/Post.js";
import Seller from "../models/Seller.js";

export const uploadPost = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      priceType,
      location,
      tags,
      thumbnail,
    } = req.body;
    const seller = await Seller.findOne({ userId: req.user.id });
    const response = await Post.create({
      seller: seller._id,
      title,
      description,
      category,
      price,
      priceType,
      location,
      tags,
      thumbnail,
    });
    console.log("response", response);
    res.status(200).json({
      message: "Post uploaded successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Upload error",
      status: 500,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user._id });
    const response = await Post.find({ seller: seller._id }).populate("seller");
    console.log("gigs", response);
    res.status(200).json({
      message: "gigs received!",
      gigs: response,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message || "Error!",
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const response = await Post.find().populate("seller").limit(3);
    console.log("gigs", response);
    res.status(200).json({
      message: "gigs received!",
      gigs: response,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message || "Error!",
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate(
      "seller"
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error in getSinglePost:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
