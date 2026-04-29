import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Clock,
  CheckCircle2,
  MapPin,
  Phone,
  Calendar,
  ChevronRight,
  Loader2,
  PackageOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {Footer , Navbar} from "../../components";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); 
  const navigate = useNavigate();
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/booking/getUserBookings`,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        },
      );
      console.log(response.data.data);
      setBookings(response.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((b) =>
    filter === "all" ? true : b.status === filter,
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              My Bookings
            </h1>
            <p className="text-slate-500 font-medium">
              Track and manage your service requests
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
            {["all", "pending", "completed", "cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                  filter === tab
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-400 font-bold uppercase text-xs">
              Loading your orders...
            </p>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="grid gap-6">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-4xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Service Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-wider ${getStatusColor(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                      <span className="text-slate-300">/</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {booking?.gig?.title || "Service Request"}
                    </h2>

                    <div className="flex flex-wrap gap-y-2 gap-x-6 mt-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin size={16} className="text-slate-400" />
                        <span className="text-sm font-bold">
                          {booking.address?.city},{" "}
                          {booking.address?.area}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Phone size={16} className="text-slate-400" />
                        <span className="text-sm font-bold">
                          {booking.address?.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex flex-row md:flex-col justify-between items-center md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 min-w-[150px]">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                        Total Paid
                      </p>
                      <p className="text-3xl font-black text-indigo-600">
                        ${booking.totalAmount}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase italic">
                        {booking.paymentMethod}
                      </p>
                    </div>

                    <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all active:scale-95">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[40px] py-20 px-6 text-center border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <PackageOpen size={40} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">
              No Bookings Found
            </h3>
            <p className="text-slate-400 font-medium mb-8">
              You haven't placed any orders in this category yet.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-black transition-all hover:bg-indigo-600 active:scale-95"
            >
              Explore Services
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;
