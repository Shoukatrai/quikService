import Seller from "../models/Seller.js";
import User from "../models/User.js";

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
      userId,
      businessName,
      category,
      location: { city },
      serviceRadius: radius,
      pricing: { rate },
      bio,
    });
    await User.findByIdAndUpdate(userId, { role: "seller" });
    res.status(200).json({
      message: "Seller profile created!",
      seller,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", status: 500 });
  }
};

export const getSeller = async (req, res) => {
  try {
    console.log("user");
    const userId = req.user._id;
    console.log("user id", userId);
    const seller = await Seller.findOne({ userId });
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
