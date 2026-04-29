import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client();
export const signUp = async (req, res) => {
  try {
    const { name, role, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: 400,
        message: "User already exists!",
      });
    }
    console.log("pass", password);

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashPass,
      name,
      role,
    });
    res.status(200).json({
      status: 200,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: error.message || "Something went wrong",
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log("login");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user not found!");
      return res.status(400).json({
        status: 400,
        message: "User not Found",
      });
    }
    const hashedPasswordFromDB = user.password;
    const isMatch = await bcrypt.compare(password, hashedPasswordFromDB);
    console.log("pass", isMatch);
    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    const { pass, ...userWithoutPass } = user._doc;
    res.status(200).json({
      status: 200,
      data: userWithoutPass,
      token: token,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: error.message || "Something went wrong",
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { credential, role } = req.body; // Frontend se role bhi lein (e.g., "seller" or "client")

    if (!credential) {
      return res.status(400).json({ message: "No credential provided" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: `${given_name} ${family_name}`,
        avator: picture,
        role: role || "client",
        authSource: "google",
        isVerified: true,
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "Authentication successful",
      token,
      data: user,
    });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({
      message: "Authentication failed",
      error: err.message,
    });
  }
};

export const authMe = async (req, res) => {
  try {
    const user = await User.findOne(req.user._id).populate("seller");
    console.log("user", user);
    res.status(200).json({ user, status: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", status: 500 });
  }
};


export const update_password = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Password Update Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
