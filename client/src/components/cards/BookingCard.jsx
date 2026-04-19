import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";

const BookingCard = ({ booking, onAccept, onReject }) => {
  console.log("booking", booking);

  const statusStyles = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    accepted: "bg-blue-50 text-blue-600 border-blue-100",
    completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    cancelled: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold">
            {booking?.client?.name?.charAt(0) || "A"}
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{booking?.serviceDetails?.note}</h3>
            <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
              <User size={12} />
              <span>{booking?.client?.name}</span>
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusStyles[booking?.status]}`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 my-5 py-4 border-y border-slate-50">
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar size={16} className="text-indigo-500" />
          <span className="text-sm font-medium">{booking?.serviceDetails?.date}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600">
          <Clock size={16} className="text-indigo-500" />
          <span className="text-sm font-medium">{booking?.serviceDetails?.time}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 col-span-2">
          <MapPin size={16} className="text-indigo-500" />
          <span className="text-sm font-medium truncate">{booking?.serviceDetails?.address}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">Total Payout</p>
          <p className="text-lg font-black text-slate-900">${65}</p>
        </div>

        {status === "pending" && (
          <div className="flex gap-2">
            <button
              onClick={() => onReject(booking._id)}
              className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              title="Reject"
            >
              <XCircle size={24} />
            </button>
            <button
              onClick={() => onAccept(booking._id)}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100"
            >
              Accept Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
