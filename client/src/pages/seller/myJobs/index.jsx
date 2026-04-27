import React, { useEffect, useState } from "react";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import BookingCard from "../../../components/cards/BookingCard";
import axios from "axios";
import { Loader2, Briefcase } from "lucide-react";
import { notify } from "../../../utils";

const MyJobs = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const { user } = useSelector((state) => state.user);
  console.log("user", user);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${base_url}/booking/getAllBookings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      setBookings(response.data.data || []);
    } catch (error) {
      console.log("Booking error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId, status) => {
    try { 
      await axios.patch(
        `${base_url}/booking/status_update/${bookingId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      notify({ message: `Status ${status}!`, status: "success" });
      fetchBookings();
    } catch (error) {
      console.error("Status Update Error:", error);
      alert("Failed to update booking status.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <SellerDashboardLayout user={user}>
      <div className="p-6">
        <h1 className="text-2xl font-black text-slate-900 mb-6">
          Service Requests
        </h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-100">
            <Loader2 className="animate-spin text-indigo-600 mb-2" size={40} />
            <p className="text-slate-500">Checking for new jobs...</p>
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <BookingCard
                booking={booking}
                key={booking?._id}
                onAccept={() => handleUpdateStatus(booking._id, "accepted")}
                onReject={() => handleUpdateStatus(booking._id, "rejected")}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <Briefcase className="mx-auto text-slate-300 mb-4" size={50} />
            <h3 className="text-xl font-bold text-slate-900">No Jobs Yet</h3>
            <p className="text-slate-500">
              When customers book your service, they will appear here.
            </p>
          </div>
        )}
      </div>
    </SellerDashboardLayout>
  );
};

export default MyJobs;
