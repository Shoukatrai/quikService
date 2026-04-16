import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../../store/counterSlice";
import Cookies from "js-cookie"
const Verification = () => {
  const userData = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("pending_upload"); 

  const steps = [
    { id: 1, label: "Identity", icon: <FileText size={18} /> },
    { id: 2, label: "Professional Info", icon: <ShieldCheck size={18} /> },
    { id: 3, label: "Review", icon: <Clock size={18} /> },
  ];

   const dispatch = useDispatch();
    const base_url = import.meta.env.VITE_BACKEND_URL;
    const fetchUser = async () => {
      try {
        const user = await axios.get(
          `${base_url}/auth/me`,
          {
            headers: {
              applicationType: "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          },
        );
        console.log("user", user.data.user);
        dispatch(setUser(user.data.user));
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      fetchUser();
    }, []);

  return (
    <SellerDashboardLayout user={userData}>
      <div className="max-w-4xl mx-auto pb-20">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            Get Verified
          </h1>
          <p className="text-slate-500">
            Complete your profile verification to start receiving high-value
            leads.
          </p>
        </div>

        {/* Stepper UI */}
        <div className="flex justify-between items-center mb-12 px-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  step >= s.id
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-white border-slate-300 text-slate-400"
                }`}
              >
                {step > s.id ? <CheckCircle2 size={20} /> : s.icon}
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  step >= s.id ? "text-indigo-600" : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800">
                Identity Verification
              </h3>
              <p className="text-sm text-slate-500">
                Please upload a valid Government Issued ID (Driver's License or
                Passport).
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Document Type
                  </label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>National ID Card</option>
                    <option>Driver's License</option>
                    <option>Passport</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Document Number
                  </label>
                  <input
                    type="text"
                    placeholder="ABC123456"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all cursor-pointer group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="text-indigo-600" />
                </div>
                <p className="font-bold text-slate-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PNG, JPG or PDF (max. 5MB)
                </p>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                >
                  Save & Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800">
                Professional Credentials
              </h3>
              <p className="text-sm text-slate-500">
                Add any certifications or business licenses that prove your
                expertise.
              </p>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                <AlertCircle className="text-amber-600 shrink-0" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  <strong>Pro-Tip:</strong> Verified professionals with listed
                  certifications get 3x more bookings on QuickService.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="text-slate-400" />
                    <span className="font-medium">Trade_License.pdf</span>
                  </div>
                  <button className="text-red-500 text-sm font-bold">
                    Remove
                  </button>
                </div>
                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-bold hover:bg-slate-50">
                  + Add Another Certificate
                </button>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-10 py-4 text-slate-600 font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200"
                >
                  Submit Application
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10">
              <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={48} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Application Submitted!
              </h3>
              <p className="text-slate-500 max-w-sm mx-auto mb-8">
                Our team usually reviews applications within 24–48 hours. You'll
                receive an email once your profile is live.
              </p>
              <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold">
                Back to Dashboard
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </SellerDashboardLayout>
  );
};

export default Verification;
