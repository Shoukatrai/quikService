import React from "react";
import { Star, MapPin, CheckCircle, Clock } from "lucide-react";

const SellerCard = ({ sellerData }) => {
  const skillDisplay = sellerData?.skills?.slice(0, 3).join(" • ");

  return (
    <div className="max-w-sm bg-white rounded-[2.5rem] p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300">
      <div className="relative flex justify-center mb-4">
        <div className="w-28 h-28 rounded-[2rem] overflow-hidden border-4 border-white shadow-lg">
          <img
            src={
              sellerData?.profilePicture ||
              "https://plus.unsplash.com/premium_photo-1664299069577-11579b487e6c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Provider"
            className="w-full h-full object-cover"
          />
        </div>
        {sellerData?.isVerified && (
          <div className="absolute -bottom-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
            <CheckCircle size={12} /> Verified
          </div>
        )}
      </div>

      {/* Body: Info */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
          {sellerData?.businessName || sellerData?.name}
        </h2>
        <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider">
          {sellerData?.category}
        </p>

        {/* Rating */}
        <div className="flex justify-center items-center gap-1 text-amber-500 bg-amber-50 w-fit mx-auto px-3 py-1 rounded-xl">
          <Star size={16} fill="currentColor" />
          <span className="font-bold text-sm">4.9</span>
          <span className="text-slate-400 text-xs font-medium">
            (120 Reviews)
          </span>
        </div>
      </div>

      {/* Details List */}
      <div className="mt-6 space-y-3 border-t border-slate-50 pt-6">
        <div className="flex items-center gap-3 text-slate-600 text-sm">
          <MapPin size={18} className="text-slate-400" />
          <span className="font-medium">
            {sellerData?.location.city || "Karachi, Pakistan"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-600 text-sm">
          <Clock size={18} className="text-slate-400" />
          <span className="font-medium text-green-600">Available Now</span>
        </div>
      </div>

      {/* Skills Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {sellerData?.skills?.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Price & Action */}
      <div className="mt-8 flex items-center justify-between">
        <div>
          <span className="text-2xl font-black text-slate-900">
            ${sellerData?.pricing?.rate || ""}
          </span>
          <span className="text-slate-400 text-sm font-bold">/hr</span>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200">
          Hire Now
        </button>
      </div>
    </div>
  );
};

export default SellerCard;
