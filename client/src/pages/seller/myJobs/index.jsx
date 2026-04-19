import React, { useEffect, useState } from "react";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import BookingCard from "../../../components/cards/BookingCard";
import axios from "axios";

const MyJobs = () => {
  const [bookings, setBookings] = useState([]);
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const userData = useSelector((state) => state.user);
  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${base_url}/booking/getAllBookings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setBookings(response.data.data);
      console.log("Booking response", response.data.data);
    } catch (error) {
      console.log("Booking error", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <SellerDashboardLayout user={userData}>
      {bookings.map((booking) => {
        return <BookingCard booking={booking} key={booking?._id} onAccept={""} onReject={""} />;
      })}
    </SellerDashboardLayout>
  );
};

export default MyJobs;
