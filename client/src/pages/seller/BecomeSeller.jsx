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

const BecomeSeller = () => {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
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

  const nextStep = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ["businessName", "category"];
    if (step === 2) fieldsToValidate = ["city"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // 3. Final Submission
  const onSubmit = (data) => {
    console.log("Final Form Data:", data);
    alert("Profile Created Successfully!");
  };

  // Watching radius for the UI display
  const currentRadius = watch("radius");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8 flex justify-between items-center px-2">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    step >= num
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step > num ? <CheckCircle size={16} /> : num}
                </div>
                <div
                  className={`h-1 w-16 md:w-24 rounded transition-colors ${
                    step > num ? "bg-indigo-600" : "bg-slate-200"
                  }`}
                  style={{ display: num === 3 ? "none" : "block" }}
                />
              </div>
            ))}
          </div>

          <motion.div
            layout
            className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 md:p-12 border border-slate-100"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* STEP 1: BUSINESS INFO */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key="step1"
                    className="space-y-6"
                  >
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit mb-2">
                      <Briefcase size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">
                      Tell us about your work
                    </h2>

                    <div className="space-y-4">
                      <div className="group">
                        <label className="text-sm font-bold text-slate-700 ml-1">
                          Business Name
                        </label>
                        <input
                          {...register("businessName", {
                            required: "Business name is required",
                          })}
                          className={`w-full mt-2 p-4 bg-slate-50 border ${errors.businessName ? "border-red-400" : "border-slate-200"} rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
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
                          className="w-full mt-2 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
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
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors"
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
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-2">
                      <MapPin size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">
                      Where do you work?
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <input
                          {...register("city", {
                            required: "City is required",
                          })}
                          className={`w-full p-4 bg-slate-50 border ${errors.city ? "border-red-400" : "border-slate-200"} rounded-2xl outline-none`}
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
                          className="w-full accent-indigo-600"
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

                {/* STEP 3: RATES & BIO */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key="step3"
                    className="space-y-6"
                  >
                    <div className="p-3 bg-green-50 text-green-600 rounded-2xl w-fit mb-2">
                      <DollarSign size={24} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900">
                      Set your rates
                    </h2>

                    <div className="space-y-4">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                          $
                        </span>
                        <input
                          type="number"
                          {...register("rate", {
                            required: "Please set a rate",
                          })}
                          className={`w-full p-4 pl-8 bg-slate-50 border ${errors.rate ? "border-red-400" : "border-slate-200"} rounded-2xl outline-none`}
                          placeholder="Hourly Rate"
                        />
                      </div>
                      <textarea
                        {...register("bio")}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none resize-none"
                        placeholder="Briefly describe your experience..."
                        rows="4"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-indigo-600 transition-all"
                      >
                        Start Selling
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
