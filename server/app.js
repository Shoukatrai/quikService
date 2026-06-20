import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db/dbConnection.js";
import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/serviceRoute.js";
import sellerRouter from "./routes/seller.js";
import bookingRouter from "./routes/Booking.js";
import notificationRouter from "./routes/Notification.js";
import adminRouter from "./routes/adminRoute.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();
const app = express();
const server = createServer(app);
const port = process.env.PORT || 5000;

//initialize socket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
  },
  allowEIO3: true,
});

//connection
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
    socket.join(userId);
    console.log("user joined room", userId);
  }
  console.log("socket connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dbConnection();

//
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/admin", adminRouter);
//

server.listen(port, () => console.log(`Server is running on port ${port}`));
export { io };
