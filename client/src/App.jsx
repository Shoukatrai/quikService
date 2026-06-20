import React, { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { Route, Routes } from "react-router-dom";
import {
  Signup,
  Login,
  MyJobs,
  Earnings,
  Settings,
  Verification,
  BecomeSeller,
  SellerRoute,
  NotFound,
  Home,
  MyGigs,
  CreateGig,
  JobDetails,
  Checkout,
  MyBookings,
  ClientProfile,
  ServicesPage,
  AuthRoutes,
  SellerHome,
  AdminHome,
  AdminVerificationPage,
} from "./pages";
import { Bounce, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "./utils";
import axios from "axios";
import { setUser } from "./store/counterSlice";
import AdminRoute from "./Routes/AdminRoute";
import OverviewPage from "./pages/seller/Home";
import JobPreview from "./pages/seller/myJobs/Job_Preview";

const App = () => {
  const dispatch = useDispatch();
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const END_POINT = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"; // Use env for production

  const token = Cookies.get("token");
  const { user } = useSelector((state) => state.user);
  const socket = useRef(null);

  // 1. Fetch User - Wrapped in useCallback to prevent re-creation
  const fetchUser = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${base_url}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUser(res.data.user));
    } catch (error) {
      console.error("Auth Error:", error);
      // Optional: Clear cookies if token is invalid
      // Cookies.remove("token");
    }
  }, [base_url, dispatch, token]);

  // 2. Trigger fetchUser only on mount or when token changes
  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  // 3. Socket Logic - Consolidated and Cleaned Up
  useEffect(() => {
    if (user && token) {
      if (!socket.current) {
        socket.current = io(END_POINT, {
          query: { userId: user._id },
          transports: ["websocket"],
        });

        socket.current.on("connect", () => {
          console.log("Socket Connected:", socket.current.id);
        });

        socket.current.on("notification_request", (data) => {
          notify({ message: data.message, status: "info" });
        });

        socket.current.on("booking_status_updated", (data) => {
          notify({ message: data.message, status: data.status });
        });

        socket.current.on("connect_error", (err) => {
          console.error("Socket Connection Error:", err.message);
        });
      }
    } else {
      // If no user or token, disconnect existing socket
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, [user, token, END_POINT]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth Routes (Login/Signup) */}
        <Route element={<AuthRoutes />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected Seller Routes */}
        <Route element={<SellerRoute />}>
          <Route path="/seller-dashboard" element={<OverviewPage />} />
          <Route path="/seller-jobs" element={<MyJobs />} />
          <Route path="/seller-gigs" element={<MyGigs />} />
          <Route path="/seller-create_gig" element={<CreateGig />} />
          <Route path="/seller-earnings" element={<Earnings />} />
          <Route path="/seller-setting" element={<Settings />} />
          <Route path="/seller-verify" element={<Verification />} />
          <Route path="/job/:id" element={<JobPreview />} />
        </Route>

        {/* Public/Client Routes */}
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/become-seller" element={<BecomeSeller />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-profile" element={<ClientProfile />} />
        <Route path="/services" element={<ServicesPage />} />

        {/* ADMIN ROUTES */}

        <Route element={<AdminRoute />}>
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/verify-sellers" element={<AdminVerificationPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Bounce}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;

