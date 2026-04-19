import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 rounded-full">
            <AlertCircle size={48} className="text-red-500" />
          </div>
        </div>
        <h1 className="text-8xl font-black text-slate-900">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mt-4">Page Not Found</h2>
        <p className="text-slate-500 mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;