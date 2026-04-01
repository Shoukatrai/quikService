import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL || "NOT FOUND";
    
export const dbConnection = () => {
  console.log("url", MONGO_URL);
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
};
