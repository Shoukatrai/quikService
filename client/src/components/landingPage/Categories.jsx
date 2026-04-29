import React from 'react';
import { 
  FaPaintRoller, FaPlug, FaHammer, FaTruck, 
  FaHandHoldingHeart, FaCut, FaLaptopCode, FaWrench 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const categories = [
  { name: "Painting", icon: <FaPaintRoller />, color: "bg-orange-50 text-orange-600", border: "hover:border-orange-200" },
  { name: "Electrical", icon: <FaPlug />, color: "bg-blue-50 text-blue-600", border: "hover:border-blue-200" },
  { name: "Carpentry", icon: <FaHammer />, color: "bg-amber-50 text-amber-600", border: "hover:border-amber-200" },
  { name: "Moving", icon: <FaTruck />, color: "bg-emerald-50 text-emerald-600", border: "hover:border-emerald-200" },
  { name: "Caregiving", icon: <FaHandHoldingHeart />, color: "bg-rose-50 text-rose-600", border: "hover:border-rose-200" },
  { name: "Salon", icon: <FaCut />, color: "bg-purple-50 text-purple-600", border: "hover:border-purple-200" },
  { name: "IT Support", icon: <FaLaptopCode />, color: "bg-indigo-50 text-indigo-600", border: "hover:border-indigo-200" },
  { name: "Plumbing", icon: <FaWrench />, color: "bg-sky-50 text-sky-600", border: "hover:border-sky-200" },
];

const Categories = () => {
  return (
    <section className="py-6 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Popular <span className="text-indigo-600">Categories</span>
            </h2>
            <p className="text-slate-500 mt-2 font-medium">Browse by specialized service types</p>
          </div>
          <button className="text-sm font-black text-indigo-600 hover:underline uppercase tracking-widest">
            See All
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className={`cursor-pointer group p-6 rounded-[2.5rem] border border-slate-50 transition-all duration-300 flex flex-col items-center text-center hover:shadow-xl hover:shadow-indigo-50 ${cat.border}`}
            >
              {/* Icon Container */}
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-500`}>
                {cat.icon}
              </div>
              
              {/* Name */}
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-tighter group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;