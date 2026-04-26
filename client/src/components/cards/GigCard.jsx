import React from "react";
import { 
  Edit3, 
  Trash2, 
  Star, 
  MapPin, 
  Eye, 
  MoreVertical 
} from "lucide-react";

const SellerGigCard = ({ gig, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={gig.thumbnail}
          alt={gig.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
            gig.isActive ? "bg-emerald-500 text-white" : "bg-slate-500 text-white"
          }`}>
            {gig.isActive ? "Active" : "Paused"}
          </span>
        </div>
        
        {/* Category Overlay */}
        <div className="absolute bottom-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-indigo-600 shadow-sm">
                {gig.category}
            </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-900 leading-tight line-clamp-2 h-10 flex-1 mr-2">
            {gig.title}
          </h3>
          <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">{gig.rating || "0.0"}</span>
          </div>
        </div>

        <div className="flex items-center text-slate-400 text-xs gap-1 mb-4">
          <MapPin size={14} />
          <span className="truncate">{gig.location}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Starting from</p>
            <p className="text-lg font-black text-indigo-600">
              ${gig.price}
              <span className="text-xs font-medium text-slate-400">/{gig.priceType === 'hourly' ? 'hr' : 'fix'}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(gig)}
              className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              title="Edit Gig"
            >
              <Edit3 size={18} />
            </button>
            <button 
              onClick={() => onDelete(gig._id)}
              className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
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