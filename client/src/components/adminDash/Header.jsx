import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  Globe,
  Zap,
  ChevronDown,
  ShieldAlert,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminHeader = ({ toggleSidebar, user }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40">
      {/* 1. Left: Mobile Toggle & Global Status */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
        >
          <Menu size={22} />
        </button>

        {/* Platform Status Badge */}
        <div className="hidden xl:flex items-center gap-5 ml-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
              <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Live System
            </span>
          </div>

          <div className="h-4 w-[1px] bg-slate-200"></div>

          <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-3 py-1 rounded-lg border border-rose-100">
            <ShieldAlert size={14} />
            <span className="text-[11px] font-black uppercase">
              3 Security Alerts
            </span>
          </div>
        </div>
      </div>

      {/* 2. Middle: Global Command Search */}
      <div className="hidden md:flex items-center relative group max-w-md w-full mx-8">
        <Search
          className="absolute left-4 text-slate-400 group-focus-within:text-rose-500 transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Search Users, Transactions, Gigs..."
          className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-rose-500/5 focus:border-rose-200 outline-none transition-all font-medium"
        />
        <div className="absolute right-3 px-1.5 py-1 bg-slate-200/50 rounded text-[10px] font-bold text-slate-500 uppercase">
          Ctrl + K
        </div>
      </div>

      {/* 3. Right: Tools & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Quick Tools */}
        <div className="flex items-center gap-1 border-r border-slate-100 pr-2 md:pr-4">
          <button
            title="View Site"
            className="p-2.5 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
          >
            <Globe size={20} />
          </button>
          <button
            title="System Performance"
            className="p-2.5 text-slate-500 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all"
          >
            <Zap size={20} />
          </button>
          <button className="relative p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100"
          >
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-slate-200">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-black text-slate-900 leading-none">
                Super Admin
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                Root Access
              </p>
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${showProfileDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {/* Actual Dropdown Menu */}
          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-[1.5rem] shadow-2xl shadow-slate-200/50 p-2 z-50"
              >
                <div className="p-3 border-b border-slate-50 mb-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Account
                  </p>
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {user?.email || "admin@system.com"}
                  </p>
                </div>

                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  <User size={16} /> My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  <Settings size={16} /> Preferences
                </button>

                <div className="h-[1px] bg-slate-50 my-1" />

                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                  <LogOut size={16} /> Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
