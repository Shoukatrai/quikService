import React from "react";
import { Calendar, MapPin, Clock, Check, X } from "lucide-react";

const BookingCard = ({ booking, onAccept, onReject }) => {
  // Date formatting helper
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
            booking.status === 'pending' ? 'bg-amber-100 text-amber-600' : 
            booking.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
          }`}>
            {booking.status}
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-2">
            {booking.gigId?.title || "Service Request"}
          </h3>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-slate-500 text-sm gap-2">
          <Calendar size={16} className="text-indigo-500" />
          <span>{formatDate(booking.createdAt)}</span>
        </div>
        <div className="flex items-center text-slate-500 text-sm gap-2">
          <MapPin size={16} className="text-indigo-500" />
          <span>{booking.serviceDetails?.address || "Location not provided"}</span>
        </div>
      </div>

      {/* --- Yahan Check Karein: Buttons Section --- */}
      {booking.status === "pending" ? (
        <div className="flex gap-3 mt-4">
          <button
            onClick={onAccept}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
          >
            <Check size={18} /> Accept
          </button>
          <button
            onClick={onReject}
            className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <X size={18} /> Reject
          </button>
        </div>
      ) : (
        <div className="text-center py-2 bg-slate-50 rounded-xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
            Request {booking.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingCard;