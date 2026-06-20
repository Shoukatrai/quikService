import React, { useState } from "react";
import { Star, MapPin, ArrowRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setGig } from "../../store/gigSlice";
import { useNavigate } from "react-router-dom";

const ClientGigCard = ({ gig }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleViewDetail = (e) => {
    // Agar user favorite button par click kare toh navigate na ho
    if (e.target.closest(".fav-btn")) return;

    dispatch(setGig(gig));
    navigate(`/job-details/${gig._id}`);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Card click event ko rokne ke liye
    setIsFavorite(!isFavorite);
    // Yahan aap apni API call ya dispatch action add kar sakte hain
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={handleViewDetail}
      className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer"
    >
      {/* 1. Image & Badge Section */}
      <div className="relative aspect-[1.2/1] overflow-hidden">
        <img
          src={gig?.thumbnail}
          alt={gig?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Glassmorphism Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Actions */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {/* Rating */}
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm border border-white/20">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-[13px] font-bold text-slate-800">
              {gig.rating > 0 ? gig.rating.toFixed(1) : "4.9"}
            </span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="fav-btn w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all active:scale-90 border border-white/20"
          >
            <Heart
              size={20}
              className={`transition-colors duration-300 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-400"}`}
            />
          </button>
        </div>

        {/* Category Label */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/20 backdrop-blur-lg border border-white/30 px-3 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">
            {gig.category}
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
            {gig.title}
          </h3>
        </div>

        <p className="text-sm text-slate-500 line-clamp-2 mb-4 min-h-[40px]">
          {gig.description}
        </p>

        {/* Location & Tags */}
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-1 text-slate-400">
            <MapPin size={14} />
            <span className="text-xs font-medium">{gig.location}</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
            {gig.priceType === "hourly" ? "Remote" : "Fixed"}
          </span>
        </div>

        <div className="h-[1px] w-full bg-slate-50 mb-5" />

        {/* 3. Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Starting at
            </span>
            <div className="flex items-baseline gap-1">
              <span className="capitalize font-black text-slate-900">
                Rs.{gig.price}
              </span>
              <span className="text-xs font-medium text-slate-400">
                /{gig.priceType === "hourly" ? "hr" : "pkg"}
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-slate-900 text-white h-11 px-5 rounded-xl font-bold text-sm flex items-center gap-2 group-hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 group-hover:shadow-indigo-200"
          >
            Explore
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientGigCard;
