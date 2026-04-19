import React from "react";
import { Edit3, Trash2, Eye, Star, MapPin, MoreVertical } from "lucide-react";

const SellerGigCard = ({ post, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
      {/* Image & Status Badge */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border ${
              post.isActive
                ? "bg-emerald-500 text-white border-emerald-400"
                : "bg-slate-500 text-white border-slate-400"
            }`}
          >
            {post.isActive ? "Active" : "Paused"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
            {post.category}
          </p>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-slate-700">
              {post.rating}
            </span>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 line-clamp-1 mb-1">
          {post.title}
        </h3>

        <div className="flex items-center gap-1 text-slate-500 text-xs mb-4">
          <MapPin size={12} />
          <span>{post.location}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-slate-50">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">
              Rate
            </p>
            <p className="text-lg font-black text-slate-900">
              ${post.price}
              <span className="text-xs font-normal text-slate-500">
                /{post.priceType === "hourly" ? "hr" : "fix"}
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(post._id)}
              className="p-2 bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
              title="Edit Gig"
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={() => onDelete(post._id)}
              className="p-2 bg-slate-50 text-slate-600 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
              title="Delete Gig"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerGigCard;
