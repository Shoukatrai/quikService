import Seller from "../models/Seller.js";
import Services from "../models/Services.js";

export const uploadPost = async (req, res) => {
  try {
    const seller = req.seller;
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
    const response = await Services.create({
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
      message: "Service Posted successfully",
      status: 200,
      response,
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
    const seller = await Seller.findOne({ user: req.user._id });
    const response = await Services.find({ seller: seller._id }).populate(
      "seller",
    );
    console.log("services", response);
    res.status(200).json({
      message: "services received!",
      services: response,
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
    const response = await Services.find().populate("seller").limit(3);
    console.log("services", response);
    res.status(200).json({
      message: "services received!",
      services: response,
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

    const post = await Services.findById(id).populate("seller");

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

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const editFields = req.body;

    console.log("editFields", editFields);
    const post = await Services.findByIdAndUpdate(
      id,
      { $set: editFields },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      post,
    });
  } catch (error) {
    console.error("Error in editPost:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Services.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
