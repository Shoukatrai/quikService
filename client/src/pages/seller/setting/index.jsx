import React, { useState } from "react";
import { User, Lock, Bell, Globe, Camera, Save } from "lucide-react";
import { motion } from "framer-motion";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";

const Settings = ({ user }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Public Profile", icon: <User size={18} /> },
    { id: "business", label: "Business Details", icon: <Globe size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
  ];

  return (
    <SellerDashboardLayout>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "text-slate-500 hover:bg-white hover:text-slate-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100"
          >
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Public Profile
                  </h3>
                  <p className="text-sm text-slate-500">
                    This information will be visible to clients.
                  </p>
                </div>

                {/* Avatar Upload */}
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-slate-100 overflow-hidden border-4 border-white shadow-md">
                      <img
                        src={
                          user?.avatar ||
                          "https://ui-avatars.com/api/?name=Seller"
                        }
                        alt="Avatar"
                      />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Profile Photo</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Recommended: Square JPG or PNG, min 400x400px.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="+92 3473127706"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Bio / Description
                    </label>
                    <textarea
                      rows="4"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "business" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Professional Information
                  </h3>
                  <p className="text-sm text-slate-500">
                    This information helps clients decide if you're the right
                    fit for their project.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column: Basic Professional Info */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ProFix Plumbing Solutions"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Business Category
                      </label>
                      <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none">
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Cleaning">Cleaning</option>
                        <option value="Tutoring">Tutoring</option>
                        <option value="Handyman">Handyman</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Hourly Rate ($)
                      </label>
                      <input
                        type="number"
                        placeholder="45"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Service Radius (km)
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <span className="font-bold text-slate-700 w-12 text-right">
                          25km
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Skills & Availability */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Skills (Comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="Pipe Repair, Installation, Gas Leak Detection"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Current Work Status
                      </label>
                      <div className="flex p-1 bg-slate-100 rounded-2xl">
                        <button className="flex-1 py-3 px-4 rounded-xl bg-white shadow-sm font-bold text-indigo-600 text-sm">
                          Available
                        </button>
                        <button className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-500 text-sm">
                          On Break
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Portfolio Highlights
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {/* Existing Portfolio Items */}
                        <div className="aspect-square bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-300 transition-all cursor-pointer">
                          <span className="text-2xl">+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Search Integration */}
                <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">
                      Service Location
                    </h4>
                    <p className="text-sm text-slate-600">
                      Update your primary service city to appear in local search
                      results.
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="Search city..."
                    className="w-full md:w-64 p-3 bg-white border border-indigo-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Security Settings
                  </h3>
                  <p className="text-sm text-slate-500">
                    Update your password and secure your account.
                  </p>
                </div>

                <div className="max-w-md space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      underline="none"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      underline="none"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl"
                    />
                  </div>
                  <button className="text-indigo-600 font-bold text-sm hover:underline">
                    Forgot password?
                  </button>
                </div>
              </div>
            )}

            {/* Footer Save Button */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
              <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

export default Settings;
