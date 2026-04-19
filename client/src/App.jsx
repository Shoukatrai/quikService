import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { Route, Routes } from "react-router-dom";
import {
  BecomeSeller,
  Earnings,
  Login,
  MyJobs,
  Settings,
  Signup,
  Verification,
} from "./pages";
import { Bounce, ToastContainer } from "react-toastify";
import AuthRoutes from "./Routes/AuthRoutes";
import SellerHome from "./pages/seller/Home";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "./utils";
import axios from "axios";
import { setUser } from "./store/counterSlice";
import SellerRoute from "./Routes/SellerRoute";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import MyGigs from "./pages/seller/gigs";
import CreateGig from "./pages/seller/gigs/CreateGig";

const App = () => {
  const dispatch = useDispatch();
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const END_POINT = "http://localhost:5000";
  const token = Cookies.get("token");
  const user = useSelector((state) => state.user);

  const socket = useRef(null);
  console.log("user", user, token);
  const fetchUser = async () => {
    try {
      const user = await axios.get(`${base_url}/auth/me`, {
        headers: {
          applicationType: "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("user", user.data.user);
      dispatch(setUser(user.data.user));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  });
  useEffect(() => {
    if (user && token && !socket.current) {
      socket.current = io(END_POINT, {
        query: { userId: user._id },
        transports: ["websocket"],
      });

      socket.current.on("connect", () => {
        console.log("Connected to Socket.io:", socket.current.id);
      });
      socket.current.on("notification_request", (data) => {
        console.log("New Notification:", data);
        notify({ message: data.message, status: "info" });
      });
    }
    if (!token && socket.current) {
      socket.current.disconnect();
      socket.current = null;
      console.log("Socket Disconnected");
    }
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [user, token]);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route element={<AuthRoutes />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<SellerRoute />}>
          <Route path="/seller-dashboard" element={<SellerHome />} />
          <Route path="/seller-jobs" element={<MyJobs />} />
          <Route path="/seller-gigs" element={<MyGigs />} />
          <Route path="/seller-create_gig" element={<CreateGig />} />
          <Route path="/seller-earnings" element={<Earnings />} />
          <Route path="/seller-setting" element={<Settings />} />
          <Route path="/seller-verify" element={<Verification />} />
        </Route>
        <Route path="/become-seller" element={<BecomeSeller />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
