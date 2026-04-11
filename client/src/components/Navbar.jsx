import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Find Services", href: "#" },
    { name: "Become a Provider", href: "/become-seller" },
    { name: "How it Works", href: "#" },
  ];
  return (
    <nav className="relative z-50 px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Quick<span className="text-indigo-600">Service</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <button className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-200">
            Sign In
          </button>
        </div>

        <button
          className="md:hidden p-2 text-slate-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-slate-800"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-100" />
              <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
