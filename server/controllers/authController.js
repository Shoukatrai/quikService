import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client();
export const signUp = async (req, res) => {
  try {
    console.log("body", req.body);
    const { username, user, email, password } = req.body;
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
      name: username,
      role: user,
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
      expiresIn: "1d",
    });
    res.status(200).json({
      status: 200,
      data: user,
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
    const { credential } = req.body; 
    if (!credential) {
      return res.status(400).json({ message: "No credential provided" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, given_name, family_name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: `${given_name} ${family_name}`,
        authSource: "google",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Authentication successful",
      token,
      user,
    });

  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(400).json({
      message: "Authentication failed",
    });
  }
};
