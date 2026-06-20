import React, { useEffect, useState, useRef } from "react";
import {
  ShieldCheck,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../../store/counterSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notify } from "../../../utils";

const Verification = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      docType: "National ID Card",
      docNumber: "",
      fileUrl: "",
    },
  });

  const uploadedFileUrl = watch("fileUrl");
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "qs_upload");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dsk0ukkps/image/upload",
        data,
      );
      const url = res.data.secure_url;
      setValue("fileUrl", url);
      setPreviewUrl(url);
    } catch (err) {
      console.error("Upload Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinalSubmit = async (data) => {
    if (!data.fileUrl || !data.docNumber) {
      return alert("Please complete all identity fields");
    }

    setLoading(true);
    try {
      await axios.post(`${base_url}/seller/apply_for_verification`, data, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      setStep(3);
      notify({
        message: "Verification submitted successfully!",
        status: "success",
      });
      fetchUser();
    } catch (error) {
      console.error(error.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${base_url}/auth/me`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      dispatch(setUser(res.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const steps = [
    { id: 1, label: "Identity", icon: <FileText size={18} /> },
    { id: 2, label: "Professional", icon: <ShieldCheck size={18} /> },
    { id: 3, label: "Review", icon: <Clock size={18} /> },
  ];

  return (
    <SellerDashboardLayout user={user}>
      <div className="max-w-4xl mx-auto pb-20">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            Get Verified
          </h1>
          <p className="text-slate-500">
            Complete verification to unlock "Verified Pro" status.
          </p>
        </div>

        <div className="flex justify-between items-center mb-12 px-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
          {steps.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center gap-2 bg-slate-50 px-2"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= s.id ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-slate-300 text-slate-400"}`}
              >
                {step > s.id ? <CheckCircle2 size={20} /> : s.icon}
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? "text-indigo-600" : "text-slate-400"}`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          layout
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800">
                Identity Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Document Type
                  </label>
                  <select
                    {...register("docType", { required: true })}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="National ID Card">National ID Card</option>
                    <option value="Passport">Passport</option>
                    <option value="Driver's License">Driver's License</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Document Number
                  </label>
                  <input
                    type="text"
                    {...register("docNumber", { required: true })}
                    placeholder="e.g. 42101-XXXXXXX-X"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">
                  Upload ID Photo
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
                />

                {!previewUrl ? (
                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="mx-auto animate-spin text-indigo-600" />
                    ) : (
                      <Upload className="mx-auto text-slate-400 mb-2" />
                    )}
                    <p className="text-slate-500 text-sm font-bold">
                      Click to upload ID front
                    </p>
                  </div>
                ) : (
                  <div className="relative rounded-3xl overflow-hidden border aspect-video">
                    <img
                      src={previewUrl}
                      className="w-full h-full object-cover"
                      alt="ID Preview"
                    />
                    <button
                      onClick={() => {
                        setPreviewUrl(null);
                        setValue("fileUrl", "");
                      }}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full text-red-500 shadow-lg"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={() => uploadedFileUrl && setStep(2)}
                  disabled={!uploadedFileUrl}
                  className={`px-10 py-4 rounded-2xl font-bold shadow-lg transition-all ${uploadedFileUrl ? "bg-indigo-600 text-white hover:scale-105" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 text-center">
              <ShieldCheck size={50} className="mx-auto text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-800">Final Step</h3>
              <p className="text-slate-500">
                By submitting, you agree that all provided information is
                accurate.
              </p>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 text-slate-500 font-bold"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit(onFinalSubmit)}
                  disabled={loading}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}{" "}
                  Submit for Review
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Submitted Successfully!
              </h3>
              <p className="text-slate-500 mb-8">
                Reviewing process takes about 24 hours.
              </p>
              <button
                onClick={() => navigate("/seller-dashboard")}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </SellerDashboardLayout>
  );
};

export default Verification;
