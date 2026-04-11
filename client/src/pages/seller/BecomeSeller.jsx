import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  DollarSign,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { notify } from "../../utils";
import { useNavigate } from "react-router-dom";

const BecomeSeller = () => {
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const [step, setStep] = useState(1);
const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      businessName: "",
      category: "Plumbing",
      bio: "",
      city: "",
      radius: 20,
      rate: "",
    },
    mode: "onChange",
  });

  // 2. Step-by-Step Validation
  const nextStep = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ["businessName", "category"];
    if (step === 2) fieldsToValidate = ["city"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // 3. Final API Submission
  const onSubmit = async (formData) => {
    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        `${base_url}/seller/become_seller`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        notify({ message: "Profile Created Successfully!", status: "success" });
      }
      navigate("/seller-dashboard");
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      notify({
        message:
          error.response?.data?.message || "Failed to create seller profile.",
        status: "error",
      });
    }
  };

  // Watch radius for real-time UI display
  const currentRadius = watch("radius");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8 flex justify-between items-center px-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step >= num
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step > num ? <CheckCircle size={16} /> : num}
                </div>
                {num !== 3 && (
                  <div
                    className={`h-1 w-16 md:w-24 rounded transition-all duration-500 ${
                      step > num ? "bg-indigo-600" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <motion.div
            layout
            className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 md:p-12 border border-slate-100"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* STEP 1: WORK INFO */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key="step1"
                    className="space-y-6"
                  >
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-slate-900">
                        Tell us about your work
                      </h2>
                      <p className="text-slate-500 mt-1">
                        Help clients identify your brand.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="group">
                        <label className="text-sm font-bold text-slate-700 ml-1">
                          Business Name
                        </label>
                        <input
                          {...register("businessName", {
                            required: "Business name is required",
                          })}
                          className={`w-full mt-2 p-4 bg-slate-50 border ${
                            errors.businessName
                              ? "border-red-400"
                              : "border-slate-200"
                          } rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                          placeholder="e.g. QuickFix Plumbing"
                        />
                        {errors.businessName && (
                          <p className="text-red-500 text-xs mt-1 ml-1">
                            {errors.businessName.message}
                          </p>
                        )}
                      </div>

                      <div className="group">
                        <label className="text-sm font-bold text-slate-700 ml-1">
                          Category
                        </label>
                        <select
                          {...register("category")}
                          className="w-full mt-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="Plumbing">Plumbing</option>
                          <option value="Electrical">Electrical</option>
                          <option value="Cleaning">Cleaning</option>
                          <option value="Handyman">Handyman</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors shadow-lg shadow-indigo-100"
                    >
                      Continue <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: LOCATION */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key="step2"
                    className="space-y-6"
                  >
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit">
                      <MapPin size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">
                      Where do you work?
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-bold text-slate-700 ml-1">
                          Base City
                        </label>
                        <input
                          {...register("city", {
                            required: "City is required",
                          })}
                          className={`w-full mt-2 p-4 bg-slate-50 border ${
                            errors.city ? "border-red-400" : "border-slate-200"
                          } rounded-2xl outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="Enter your city"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1 ml-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between font-bold text-slate-700">
                          <label>Service Radius</label>
                          <span className="text-indigo-600">
                            {currentRadius} km
                          </span>
                        </div>
                        <input
                          type="range"
                          {...register("radius")}
                          min="5"
                          max="100"
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors"
                      >
                        Continue <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PRICING & BIO */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key="step3"
                    className="space-y-6"
                  >
                    <div className="p-3 bg-green-50 text-green-600 rounded-2xl w-fit">
                      <DollarSign size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">
                      Final Touches
                    </h2>

                    <div className="space-y-4">
                      <div className="group">
                        <label className="text-sm font-bold text-slate-700 ml-1">
                          Hourly Rate ($)
                        </label>
                        <div className="relative mt-2">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            $
                          </span>
                          <input
                            type="number"
                            {...register("rate", {
                              required: "Rate is required",
                            })}
                            className={`w-full p-4 pl-8 bg-slate-50 border ${
                              errors.rate
                                ? "border-red-400"
                                : "border-slate-200"
                            } rounded-2xl outline-none focus:ring-2 focus:ring-green-500`}
                            placeholder="0.00"
                          />
                        </div>
                        {errors.rate && (
                          <p className="text-red-500 text-xs mt-1 ml-1">
                            {errors.rate.message}
                          </p>
                        )}
                      </div>

                      <div className="group">
                        <label className="text-sm font-bold text-slate-700 ml-1">
                          Bio / Experience
                        </label>
                        <textarea
                          {...register("bio")}
                          className="w-full mt-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 resize-none"
                          placeholder="Tell potential clients why they should hire you..."
                          rows="4"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        disabled={isSubmitting}
                        className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex-[2] py-4 rounded-2xl font-bold shadow-lg transition-all ${
                          isSubmitting
                            ? "bg-slate-400 cursor-not-allowed"
                            : "bg-slate-900 text-white hover:bg-indigo-600 shadow-slate-200"
                        }`}
                      >
                        {isSubmitting ? "Saving Profile..." : "Start Selling"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BecomeSeller;
