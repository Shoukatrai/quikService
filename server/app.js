import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db/dbConnection.js";
import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoute.js"
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dbConnection();

//
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
//
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
