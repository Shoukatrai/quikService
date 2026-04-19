import React from "react";
import { Search, Plus, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GigActionBar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm mb-8">
      {/* Search Input Group */}
      <div className="relative w-full md:w-96 group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search your gigs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Optional Filter Button */}
        <button className="p-3 text-slate-500 hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all">
          <Filter size={20} />
        </button>

        {/* Create New Gig Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/seller-create_gig")}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-slate-900 transition-all"
        >
          <Plus size={20} />
          <span>Create New Gig</span>
        </motion.button>
      </div>
    </div>
  );
};

export default GigActionBar;
