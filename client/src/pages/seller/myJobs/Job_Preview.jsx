import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Calendar,
  DollarSign,
  User,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";

const JobPreview = () => {
  // Mock Data: Bilkul aapke booking/order payload ke mutabiq
  const [job, setJob] = useState({
    _id: "BKG-9482",
    createdAt: "2026-06-04T10:30:00.000Z",
    serviceName: "Professional Deep Home Cleaning",
    totalAmount: "4612.50",
    serviceFee: "112.50",
    requirements:
      "Please bring an industrial vacuum cleaner. The master bedroom carpets have deep pet stains that need extra attention. Prefers eco-friendly detergents if possible.",
    paymentMethod: "Cash on Delivery",
    address: {
      house: "Apartment 4B, Grand Heights, Block C",
      area: "Near Model Town Park",
      city: "Lahore",
      phone: "03001234567",
    },
    client: {
      name: "Zain Ahmed",
      email: "zain.ahmed@example.com",
    },
  });

  // Decision States: 'pending', 'accepted', 'rejected'
  const [decision, setDecision] = useState("pending");
  // Progress States: 'Accepted', 'In Progress', 'Completed', 'Cancelled'
  const [currentStatus, setCurrentStatus] = useState("Pending Review");
  const [loading, setLoading] = useState(false);

  // Handler for Accept / Reject Actions
  const handleDecision = (type) => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setDecision(type);
      if (type === "accepted") {
        setCurrentStatus("In Progress");
      } else {
        setCurrentStatus("Rejected");
      }
      setLoading(false);
    }, 800);
  };

  // Handler for progressive status updates (Dropdown)
  const handleStatusUpdate = (e) => {
    const newStatus = e.target.value;
    setLoading(true);
    setTimeout(() => {
      setCurrentStatus(newStatus);
      setLoading(false);
    }, 600);
  };

  return (
    <SellerDashboardLayout>
      <div className="bg-slate-50 min-h-screen font-sans">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Top Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <button
              type="button"
              className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors bg-transparent border-none outline-none cursor-pointer"
            >
              <ArrowLeft size={18} /> Back to Dashboard
            </button>

            {/* Status Badge Display */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                Current Status:
              </span>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                  currentStatus === "Pending Review"
                    ? "bg-amber-100 text-amber-700"
                    : currentStatus === "Rejected"
                      ? "bg-rose-100 text-rose-700"
                      : currentStatus === "In Progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {currentStatus}
              </span>
            </div>
          </div>

          {/* Main Grid Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* LEFT & CENTER PANEL: Complete Job Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Core Job Title Banner */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-wider mb-2">
                  <Briefcase size={14} /> Job ID: #{job._id}
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">
                  {job.serviceName}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={16} className="text-slate-400" />
                    <span>
                      Received:{" "}
                      {new Date(job.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-slate-400" />
                    <span>Method: {job.paymentMethod}</span>
                  </div>
                </div>
              </div>

              {/* Client Context Information */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                    <User size={16} />
                  </div>
                  Client Specifications
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                      Customer Name
                    </p>
                    <p className="font-bold text-slate-800">
                      {job.client.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {job.client.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                      Contact Details
                    </p>
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Phone size={14} className="text-slate-400" />{" "}
                      {job.address.phone}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <MapPin size={12} /> Service Venue Address
                  </p>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {job.address.house}, {job.address.area},{" "}
                    <span className="font-bold text-slate-900">
                      {job.address.city}
                    </span>
                  </p>
                </div>
              </div>

              {/* Special Instructions / Requirements */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                    <AlertCircle size={16} />
                  </div>
                  Job Requirements
                </h3>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-medium">
                    {job.requirements ||
                      "No custom instructions provided by the client."}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: Live Action & Management Widget */}
            <div className="lg:col-span-1 space-y-6">
              {/* Step Controller Module */}
              <div className="bg-white rounded-[40px] p-8 shadow-xl border border-indigo-50 sticky top-10">
                <h3 className="text-xl font-black text-slate-900 mb-6">
                  Manage Order
                </h3>

                {/* SECTION A: Initial Accept or Reject Phase */}
                {decision === "pending" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-2xl text-amber-800 mb-4">
                      <p className="text-xs font-bold leading-relaxed">
                        Review full specifications and requirements carefully
                        before altering contract states.
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleDecision("accepted")}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                    >
                      <CheckCircle2 size={18} /> Accept Job Offer
                    </button>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleDecision("rejected")}
                      className="w-full bg-transparent hover:bg-rose-50 border-2 border-rose-200 text-rose-600 py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98"
                    >
                      <XCircle size={18} /> Reject Offer
                    </button>
                  </div>
                )}

                {/* SECTION B: Progressive Tracking Mode (Opens Only Post-Acceptance) */}
                {decision === "accepted" && (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-800">
                      <CheckCircle2 size={20} className="shrink-0" />
                      <p className="text-xs font-bold uppercase tracking-wide">
                        Job Accepted Successfully!
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-1">
                        <TrendingUp size={12} /> Live Progress Tracker
                      </label>
                      <select
                        value={currentStatus}
                        onChange={handleStatusUpdate}
                        disabled={loading || currentStatus === "Completed"}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed"
                      >
                        <option value="In Progress">⚡ In Progress</option>
                        <option value="Completed">✅ Completed</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* SECTION C: Terminated Contract State */}
                {decision === "rejected" && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 animate-fadeIn">
                    <XCircle size={20} className="shrink-0" />
                    <p className="text-xs font-bold uppercase tracking-wide">
                      You have declined this project query.
                    </p>
                  </div>
                )}

                {/* Commercial Settlement breakdown matrix */}
                <div className="mt-8 pt-8 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <span>Gross Value</span>
                    <span>
                      Rs.{" "}
                      {(
                        parseFloat(job.totalAmount) - parseFloat(job.serviceFee)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <span>Platform Fee</span>
                    <span>Rs. {job.serviceFee}</span>
                  </div>
                  <div className="pt-3 border-t border-dashed border-slate-200 flex justify-between items-end">
                    <span className="text-xs font-black text-slate-900 uppercase">
                      Net Payout
                    </span>
                    <span className="text-2xl font-black text-indigo-600 leading-none tracking-tight flex items-center">
                      <DollarSign size={18} className="-mr-1" />{" "}
                      {job.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

export default JobPreview;
