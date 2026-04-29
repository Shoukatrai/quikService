import Seller from "../models/Seller.js";
import Verification from "../models/Verification.js";

export const getUnVerifiedSellers = async (req, res) => {
  try {
    const requests = await Verification.find({ status: "pending" }).populate(
      "seller",
    );
    res.status(200).json({
      requests,
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

export const verifySeller = async (req, res) => {
  try {
    const { status, sellerId } = req.body;

    const seller = await Seller.findById(sellerId);
    console.log("seller", seller);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found", status: 404 });
    }

    if (status === "approved") {
      seller.isVerified = true;
    } else {
      seller.isVerified = false;
    }
    await seller.save();

    await Verification.findOneAndUpdate(
      { seller: sellerId },
      { status: status },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: `Seller has been ${status} successfully`,
      isVerified: seller.isVerified,
    });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({
      message: error.message || "Something went wrong",
      status: 500,
    });
  }
};
