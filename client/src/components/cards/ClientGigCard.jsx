import React from "react";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; // Optional animations ke liye
import { useDispatch } from "react-redux";
import { setGig } from "../../store/gigSlice";
import { useNavigate } from "react-router-dom";

const ClientGigCard = ({ gig }) => {
  const dispatch = useDispatch(); // Hook ko top par define karein
  const navigate = useNavigate();
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const handleViewDetail = () => {
    dispatch(setGig(gig));
    
    navigate(`/job-details/${gig._id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-4xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
    >
      {/* 1. Thumbnail Section */}
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={gig?.thumbnail}
          alt={gig?.note}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Rating Badge - Image ke upar float karega */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <Star size={16} className="text-amber-500" fill="currentColor" />
          <span className="text-sm font-black text-slate-900">
            {gig.rating > 0 ? gig.rating.toFixed(1) : "New"}
          </span>
          {gig.totalReviews > 0 && (
            <span className="text-xs text-slate-400 font-medium">
              ({gig.totalReviews})
            </span>
          )}
        </div>

        {/* Category Overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-indigo-600/90 backdrop-blur-sm px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg uppercase tracking-wider">
            {gig.category}
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3 line-clamp-2 h-12 flex items-start group-hover:text-indigo-600 transition-colors">
          {gig.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-500 mb-5 line-clamp-2 h-10">
          {truncateDescription(gig.description, 80)}
        </p>

        {/* Location & Tags Row */}
        <div className="flex items-center justify-between gap-3 text-slate-400 text-xs mb-6 border-b border-slate-50 pb-5">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin size={15} className="text-indigo-400" />
            <span>{gig.location}</span>
          </div>
          {/* Tags (optional, pehle 2 tags dikhayen) */}
          {gig.tags && gig.tags.length > 0 && (
            <div className="flex gap-1.5">
              {gig.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-50 px-2.5 py-1 rounded-md font-medium text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3. Footer Section (Price & CTA) */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tight mb-0.5">
              Starting from
            </p>
            <p className="text-2xl font-black text-slate-950 leading-none">
              ${gig.price}
              <span className="text-xs font-bold text-slate-400 lowercase">
                /{gig.priceType === "hourly" ? "hr" : "job"}
              </span>
            </p>
          </div>

          <button
            className="bg-slate-900 text-white px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 group-hover:bg-indigo-600 transition-all shadow-md active:scale-95"
            onClick={handleViewDetail}
          >
            View Details
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientGigCard;
