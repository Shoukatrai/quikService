import React from "react";
import { Calendar, MapPin, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ---> Import Navigate Hook

const BookingCard = ({ booking, onAccept, onReject }) => {
  const navigate = useNavigate(); // ---> Initialize hook

  // Date formatting helper
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Card click handle karne ke liye handler
  const handleCardClick = () => {
    // Apne route path ke mutabiq id pass karein (jaise: /job-details/id)
    navigate(`/job/${booking._id}`); 
  };

  return (
    <div 
      onClick={handleCardClick} // ---> Card Click Event Added
      className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span
            className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
              booking.status === "pending"
                ? "bg-amber-100 text-amber-600"
                : booking.status === "accepted" || booking.status === "accepted" // status standard dynamic handling
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-red-100 text-red-600"
            }`}
          >
            {booking.status}
          </span>
          {/* group-hover utility se pure card par hover hone se title ka color thoda badlega */}
          <h3 className="text-lg font-bold text-slate-900 mt-2 group-hover:text-indigo-600 transition-colors">
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
          <span className="line-clamp-1">
            {booking.address?.house 
              ? `${booking.address.house}, ${booking.address.area}, ${booking.address.city}`
              : "Location not provided"}
          </span>
        </div>
      </div>

      {/* Buttons Section */}
      {booking.status === "pending" ? (
        <div className="flex gap-3 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation(); // ---> Taake full card ka click trigger na ho
              onAccept();
            }}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-sm"
          >
            <Check size={18} /> Accept
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // ---> Taake full card ka click trigger na ho
              onReject();
            }}
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