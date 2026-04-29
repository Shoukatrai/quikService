import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
  X,
} from "lucide-react";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";
import axios from "axios";
import { notify } from "../../../utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const CreateGig = () => {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      category: "Cleaning",
      price: "",
      priceType: "fixed", // Default value set
      location: "",
      tags: "",
      thumbnail: "",
    },
  });

  const thumbnailValue = watch("thumbnail");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qs_upload");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dsk0ukkps/image/upload",
        formData,
      );
      setValue("thumbnail", res.data.secure_url, { shouldValidate: true });
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Image upload failed. Try again.");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ["title", "category", "location"];
    if (step === 2) fieldsToValidate = ["description", "price", "priceType"];

    const output = await trigger(fieldsToValidate);
    if (output) setStep((s) => s + 1);
  };
  const navigate = useNavigate();
  const onSubmit = (data) => {
    try {
      if (!data.thumbnail) {
        notify({
          message: "Please upload a thumbnail first!",
          status: "error",
        });
        return;
      }
      const finalData = {
        ...data,
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
      };
      const response = axios.post(`${base_url}/post/upload-post`, finalData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("Response:", response);
      if (response.status === 200 || response.status === 201) {
        notify({
          message: response.data.message || "Gig created successfully!",
          status: "success",
        });
      } else {
        notify({
          message: response?.data?.message || "Failed to create gig",
          status: "error",
        });
      }

      reset();
      navigate("/seller-gigs");
      console.log("Final Submission:", finalData);
    } catch (error) {
      console.log("erro", error);
      notify({
        message: error.response?.data?.message || "Failed to create gig",
        status: "error",
      });
    }
  };

  return (
    <SellerDashboardLayout>
      <div className="min-h-screen bg-slate-50 py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full mx-1 transition-all duration-500 ${
                  step >= i ? "bg-indigo-600" : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
          >
            <AnimatePresence mode="wait">
              {/* STEP 1: BASIC INFO */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key="step1"
                  className="space-y-5"
                >
                  <h2 className="text-2xl font-black text-slate-900">
                    Basic Info
                  </h2>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Service Title
                    </label>
                    <input
                      {...register("title", {
                        required: "Title is required",
                        minLength: {
                          value: 10,
                          message: "Title should be at least 10 characters",
                        },
                      })}
                      className={`w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 transition-all ${errors.title ? "border-red-300" : "border-transparent focus:border-indigo-500"}`}
                      placeholder="I will provide professional..."
                    />
                    {errors.title && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Category
                    </label>
                    <select
                      {...register("category", {
                        required: "Category is required",
                      })}
                      className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500"
                    >
                      {[
                        "Cleaning",
                        "Plumbing",
                        "Electrical",
                        "Moving",
                        "Painting",
                        "Gardening",
                        "Other",
                      ].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Location
                    </label>
                    <input
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className={`w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 transition-all ${errors.location ? "border-red-400" : "border-transparent focus:border-indigo-500"}`}
                      placeholder="e.g. Karachi, Pakistan"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: PRICING */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key="step2"
                  className="space-y-5"
                >
                  <h2 className="text-2xl font-black text-slate-900">
                    Pricing & Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        {...register("price", {
                          required: "Price is required",
                          min: { value: 5, message: "Min price is $5" },
                        })}
                        className={`w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 transition-all ${errors.price ? "border-red-400" : "border-transparent focus:border-indigo-500"}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Type
                      </label>
                      <select
                        {...register("priceType", { required: true })}
                        className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500"
                      >
                        <option value="hourly">Hourly</option>
                        <option value="fixed">Fixed</option>
                      </select>
                    </div>
                  </div>
                  {errors.price && (
                    <p className="text-red-500 text-xs font-medium">
                      {errors.price.message}
                    </p>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Detailed Description
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 20,
                          message: "Describe at least in 20 characters",
                        },
                      })}
                      rows="4"
                      className={`w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 transition-all ${errors.description ? "border-red-400" : "border-transparent focus:border-indigo-500"}`}
                      placeholder="Tell buyers exactly what you offer..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1 font-medium">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: MEDIA */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key="step3"
                  className="space-y-5"
                >
                  <h2 className="text-2xl font-black text-slate-900">
                    Media & Tags
                  </h2>

                  <div className="space-y-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />

                    {!previewUrl ? (
                      <div
                        onClick={() => fileInputRef.current.click()}
                        className="border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center hover:border-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer"
                      >
                        <Upload className="mx-auto text-slate-400 mb-2" />
                        <p className="text-slate-500 text-sm font-bold">
                          Upload Gig Thumbnail
                        </p>
                      </div>
                    ) : (
                      <div className="relative rounded-3xl overflow-hidden border border-slate-200 aspect-video group">
                        <img
                          src={previewUrl}
                          className="w-full h-full object-cover"
                          alt="Preview"
                        />
                        {isUploading ? (
                          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                            <Loader2 className="animate-spin mb-2" />
                            <span className="text-xs font-bold">
                              Uploading to Cloudinary...
                            </span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewUrl(null);
                              setValue("thumbnail", "");
                            }}
                            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-red-500 shadow-md hover:bg-red-50"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Tags (Optional)
                    </label>
                    <input
                      {...register("tags")}
                      className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500"
                      placeholder="e.g. fast, reliable, expert"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* NAVIGATION */}
            <div className="flex justify-between mt-10">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <ChevronLeft size={20} /> Back
                </button>
              )}

              <div className="ml-auto">
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    Continue <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isUploading || !thumbnailValue}
                    className={`bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-100 ${
                      isUploading || !thumbnailValue
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-emerald-700"
                    }`}
                  >
                    {isUploading ? "Uploading..." : "Publish Gig"}{" "}
                    <Check size={20} />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

export default CreateGig;
