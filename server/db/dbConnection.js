import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL || "NOT FOUND";
    
export const dbConnection = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
};
