import Seller from "../models/Seller.js";
import User from "../models/User.js";
import Verification from "../models/Verification.js";

export const becomeSeller = async (req, res) => {
  try {
    console.log("data", req.body);
    const user = req.user;
    const userId = user._id;
    const { businessName, category, city, radius, rate, bio } = req.body;
    console.log("city", city);
    if (user.role == "seller") {
      return res.status(400).json({ message: "You are already a seller" });
    }
    const seller = await Seller.create({
      user: userId,
      businessName,
      category,
      location: { city },
      serviceRadius: radius,
      pricing: { rate },
      bio,
    });
    await User.findByIdAndUpdate(userId, {
      role: "seller",
      seller: seller._id,
    });
    res.status(200).json({
      message: "Seller profile created!",
      seller,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Something went wrong", status: 500 });
  }
};

export const getSeller = async (req, res) => {
  try {
    console.log("user");
    const userId = req.user._id;
    console.log("user id", userId);
    const seller = await Seller.findOne({ user: userId });
    console.log("seller", seller);
    res.status(200).json({ seller, status: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", status: 500 });
  }
};

export const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({});
    console.log("sellers", sellers);
    res.status(200).json({ sellers, status: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", status: 500 });
  }
};

export const applyForVerification = async (req, res) => {
  try {
    console.log("seller", req.user);
    const { docType, fileUrl, docNumber } = req.body;
    const userId = req.user._id;
    const seller = await Seller.findOne({ user: userId });
    console.log("seller", seller);

    if (!seller) {
      return res.status(400).json({ message: "You are not a seller" });
    }
    Verification.create({ seller: seller._id, docType, fileUrl, docNumber });
    seller.verificationDocuments.push({
      docType,
      fileUrl,
      docNumber,
    });
    await seller.save();
    res.status(200).json({
      seller,
      status: 200,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", status: 500 });
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.user._id;
    const { url } = req.body;
    const seller = await Seller.findOne({ user: userId });
    console.log("seller", seller);
    if (!seller) {
      return res.status(400).json({ message: "You are not a seller" });
    }
    seller.profilePicture = url;
    await seller.save();
    const user = await User.findByIdAndUpdate(userId, { profilePicture: url });
    res.status(200).json({ seller, status: 200 });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", status: 500 });
  }
};

export const updateSellerDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    delete updates?.isVerified;

    const updatedSeller = await Seller.findOneAndUpdate(
      { user: userId },
      { $set: updates },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!updatedSeller) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found",
      });
    }

    res.status(200).json({
      success: true,
      seller: updatedSeller,
      message: "Seller details updated successfully",
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong during update",
    });
  }
};

export const updateSellerSkills = async (req, res) => {
  try {
    const userId = req.user._id;
    const { skill } = req.body;

    if (!skill) {
      return res
        .status(400)
        .json({ success: false, message: "Skill is required" });
    }

    const updatedSeller = await Seller.findOneAndUpdate(
      { user: userId },
      {
        $addToSet: { skills: skill },
      },
      {
        returnDocument: "after", // Updated document wapas chahiye
        runValidators: true,
      },
    );

    if (!updatedSeller) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found",
      });
    }

    res.status(200).json({
      success: true,
      seller: updatedSeller, // Frontend ko updated skills array mil jayega
      message: "Skill added successfully",
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong during update",
    });
  }
};

export const deleteSellerSkills = async (req, res) => {
  try {
    const userId = req.user._id;
    const { skill } = req.body;
    console.log("skill", skill);
    if (!skill) {
      return res
        .status(400)
        .json({ success: false, message: "Skill name is required" });
    }

    const updatedSeller = await Seller.findOneAndUpdate(
      { user: userId },
      {
        $pull: { skills: skill },
      },
      { returnDocument: "after" }, 
    );

    if (!updatedSeller) {
      return res
        .status(404)
        .json({ success: false, message: "Seller not found" });
    }

    res.status(200).json({
      success: true,
      message: "Skill removed successfully",
      seller: updatedSeller,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
