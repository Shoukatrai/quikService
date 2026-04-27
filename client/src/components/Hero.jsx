import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight, Star, Shield, MapPin } from "lucide-react";

const HeroSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
      // Gigs section tak smooth scroll karne ke liye
      const gigsSection = document.getElementById("explore-gigs");
      if (gigsSection) {
        gigsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/40 rounded-full blur-[100px]"
        />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 lg:pt-12 pb-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Content & Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-widest mb-8 border border-indigo-100">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Now Live in 20+ Cities
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1] mb-8">
            Expert help is <br />
            <span className="text-indigo-600">just a click</span> away.
          </h1>

          <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
            The all-in-one marketplace to find, book, and review the best local
            service providers in your neighborhood.
          </p>

          {/* Search Bar Container */}
          <div className="relative group max-w-xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex flex-col md:flex-row gap-2 p-2 bg-white rounded-[2rem] shadow-xl border border-slate-100">
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <Search className="text-indigo-500" size={22} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Plumbing, House Cleaning, Tutoring..."
                  className="w-full outline-none text-slate-700 font-medium placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-10 py-4 bg-indigo-600 hover:bg-slate-900 text-white rounded-[1.5rem] font-bold transition-all flex items-center justify-center gap-2 group"
              >
                Find Help
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-10 flex items-center gap-8 border-t border-slate-200 pt-8">
            <div>
              <div className="text-2xl font-bold text-slate-900">12k+</div>
              <div className="text-sm font-semibold text-slate-500">
                Verified Pros
              </div>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div>
              <div className="text-2xl font-bold text-slate-900">4.9/5</div>
              <div className="text-sm font-semibold text-slate-500">
                User Rating
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Image & Floating Cards */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group"
          >
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
              alt="Service Professional"
              className="w-full h-[550px] object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Image Overlay Label */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900/90 to-transparent text-white">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="text-sm font-bold">5.0 (420 Reviews)</span>
              </div>
              <h4 className="text-2xl font-bold">Alexander Wright</h4>
              <p className="text-slate-300 font-medium">
                Master Electrician • 12 years exp.
              </p>
            </div>
          </motion.div>

          {/* Floating Card 1 */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 bg-white p-5 rounded-3xl shadow-xl z-20 border border-slate-50 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center">
              <Shield size={24} />
            </div>
            <div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                Safety First
              </div>
              <div className="text-sm font-bold text-slate-800">
                Fully Insured
              </div>
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-20 -left-12 bg-white p-5 rounded-3xl shadow-xl z-20 border border-slate-50 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-tighter">
                Nearby
              </div>
              <div className="text-sm font-bold text-slate-800">
                Top Pros in NY
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
