import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { notify } from "../../utils";

const HireModal = ({ isOpen, onClose, seller }) => {
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    address: "",
    note: "",
    service: {},
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        sellerId: seller._id,
        ...bookingDetails,
        seriviceName:seller.category,
        price:seller?.pricing?.rate
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/booking/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );

      if (response.status === 201) {
        notify({ message: "Booking created successfully!", status: "success" });
        onClose();
      }
    } catch (err) {
      notify({
        message:
          err.response?.data?.message ||
          "Failed to process booking. Try again.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-4xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-600 text-white">
          <div>
            <h3 className="text-xl font-bold">Hire {seller.name}</h3>
            <p className="text-indigo-100 text-xs">
              Confirm your service details
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-3xl font-light"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center border border-slate-100">
            <span className="text-slate-600 font-medium">
              {seller.category}
            </span>
            <span className="text-xl font-black text-indigo-600">
              ${seller?.pricing?.rate || seller.hourlyRate}/hr
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Date
              </label>
              <input
                type="date"
                required
                className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, date: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Time
              </label>
              <input
                type="time"
                required
                className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, time: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Location
            </label>
            <input
              type="text"
              placeholder="House #, Street, Area..."
              required
              className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={(e) =>
                setBookingDetails({
                  ...bookingDetails,
                  address: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Instructions (Optional)
            </label>
            <textarea
              placeholder="Tell the professional about the job..."
              className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 resize-none transition-all"
              onChange={(e) =>
                setBookingDetails({ ...bookingDetails, note: e.target.value })
              }
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-slate-900 hover:bg-indigo-600 shadow-indigo-100"
            }`}
          >
            {loading ? "Processing..." : "Confirm & Send Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HireModal;
