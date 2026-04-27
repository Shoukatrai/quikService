import React from "react";
import {
  FaUserEdit,
  FaHistory,
  FaHeart,
  FaShieldAlt,
  FaWallet,
  FaBell,
  FaSignOutAlt,
  FaStar,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ClientProfile = () => {
  const navigate = useNavigate();
  const client = {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=500&auto=format&fit=crop",
    totalSpent: 1250,
    activeBookings: 3,
    savedGigs: 12,
  };

  return (
    <>
      <Navbar />
      <div className="bg-slate-50 min-h-screen pt-10 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Profile Header */}
          <div className="bg-white rounded-[3rem] p-8 mb-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img
                src={client.avatar}
                className="w-32 h-32 rounded-[2.5rem] object-cover border-4 border-indigo-50 shadow-md"
                alt="Client"
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-2 rounded-xl text-white shadow-lg">
                <FaUserEdit size={16} />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-black text-slate-900 mb-1">
                {client.name}
              </h1>
              <p className="text-slate-500 font-medium mb-4">{client.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-black text-slate-600 uppercase tracking-wider">
                  Premium Member
                </span>
                <span className="px-4 py-1.5 bg-green-50 rounded-full text-xs font-black text-green-600 uppercase tracking-wider">
                  Verified Buyer
                </span>
              </div>
            </div>

            <div className="w-full md:w-auto flex gap-3">
              <button className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all active:scale-95">
                Account Settings
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1 space-y-4">
              {[
                { label: "Bookings", icon: <FaHistory />, active: true },
                { label: "My Wallet", icon: <FaWallet />, active: false },
                { label: "Saved Services", icon: <FaHeart />, active: false },
                { label: "Security", icon: <FaShieldAlt />, active: false },
                { label: "Notifications", icon: <FaBell />, active: false },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                    item.active
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-100"
                  }`}
                >
                  <span
                    className={item.active ? "text-white" : "text-indigo-500"}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}

              <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all mt-8">
                <FaSignOutAlt /> Logout
              </button>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Total Spent
                  </p>
                  <h3 className="text-2xl font-black text-slate-900">
                    ${client.totalSpent}
                  </h3>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Active Orders
                  </p>
                  <h3 className="text-2xl font-black text-slate-900">
                    {client.activeBookings}
                  </h3>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    Saved Gigs
                  </p>
                  <h3 className="text-2xl font-black text-slate-900">
                    {client.savedGigs}
                  </h3>
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">
                    Recent Bookings
                  </h3>
                  <button
                    className="text-indigo-600 font-bold text-sm hover:underline"
                    onClick={() => navigate("/my-bookings")}
                  >
                    View All
                  </button>
                </div>

                <div className="divide-y divide-slate-50">
                  {[1, 2].map((booking) => (
                    <div
                      key={booking}
                      className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=200&auto=format&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Service"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">
                            Professional Home Cleaning
                          </h4>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                            Order #QS-9920 • April 24, 2026
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-4 py-1.5 bg-amber-50 text-amber-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-amber-100">
                          In Progress
                        </span>
                        <p className="text-lg font-black text-slate-900">$80</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientProfile;
