import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ShieldCheck,
  MapPin,
  Phone,
  Banknote,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { notify } from "../../utils";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const base_url = import.meta.env.VITE_BACKEND_URL;
  // Redux Store se Gig data nikalna
  const selectedGig = useSelector((state) => state.gig.gig);
  const [gig, setGig] = useState(selectedGig);

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      house: "",
      area: "",
      city: "",
      phone: "",
      requirements: "",
    },
  });

  // Price Calculation
  const serviceFee = 2.5;
  const subtotal = parseFloat(gig?.price || 0);
  const totalPrice = (subtotal + serviceFee).toFixed(2);
  const fetchGig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/post/get-single-post/${id}`);
      const fetchedData = res.data.post;
      setGig(fetchedData);
    } catch (err) {
      console.error("Error fetching gig:", err);
    } finally {
      setLoading(false);
    }
  }, [id, base_url]);
  useEffect(() => {
    if (!selectedGig) {
      fetchGig();
    } else {
      setGig(selectedGig);
      setLoading(false);
    }
  }, [id, fetchGig, selectedGig]); // reduxGig removed from dependency to stop re-render loops

  // Form Submit Handler
  const onSubmit = async (formData) => {
    if (!gig) {
      return notify({ message: "Service details not found!", status: "error" });
    }

    setLoading(true);
    try {
      const orderData = {
        gigId: id,
        sellerId: gig?.seller?._id,
        paymentMethod,
        address: {
          house: formData.house,
          area: formData.area,
          city: formData.city,
          phone: formData.phone,
        },
        requirements: formData.requirements,
        totalAmount: totalPrice,
        serviceFee: serviceFee,
        serviceName: gig?.title,
      };

      console.log("orderData" , orderData);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/booking/create`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );

      if (response.status === 201 || response.status === 200) {
        notify({ message: "Order placed successfully!", status: "success" });
        navigate("/my_bookings");
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      notify({
        message:
          err.response?.data?.message || "Failed to process order. Try again.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Service
        </button>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* LEFT COLUMN: Input Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Address Details */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <MapPin size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Service Location
                </h3>
              </div>

              {/* Error Banner: Agar koi bhi field missing ho */}
              {Object.keys(errors).length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-pulse">
                  <AlertCircle size={18} />
                  <p className="text-xs font-bold uppercase">
                    Please complete all required fields.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* House No */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    House / Flat No.
                  </label>
                  <input
                    {...register("house", {
                      required: "House number is required",
                    })}
                    type="text"
                    placeholder="e.g. Apartment 4B, Plaza 1"
                    className={`w-full bg-slate-50 border ${errors.house ? "border-red-500 ring-2 ring-red-50" : "border-slate-200"} rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                  />
                  {errors.house && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">
                      {errors.house.message}
                    </p>
                  )}
                </div>

                {/* Area */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    Area / Landmark
                  </label>
                  <input
                    {...register("area", {
                      required: "Area/Landmark is required",
                    })}
                    type="text"
                    placeholder="e.g. Near Model Town Park"
                    className={`w-full bg-slate-50 border ${errors.area ? "border-red-500 ring-2 ring-red-50" : "border-slate-200"} rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                  />
                  {errors.area && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">
                      {errors.area.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    City
                  </label>
                  <input
                    {...register("city", { required: "City is required" })}
                    type="text"
                    placeholder="e.g. Lahore"
                    className={`w-full bg-slate-50 border ${errors.city ? "border-red-500 ring-2 ring-red-50" : "border-slate-200"} rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{11}$/,
                          message: "Must be 11 digits (e.03xxxxxxxxx)",
                        },
                      })}
                      type="tel"
                      placeholder="03001234567"
                      className={`w-full bg-slate-50 border ${errors.phone ? "border-red-500 ring-2 ring-red-50" : "border-slate-200"} rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Requirements Field */}
              <div className="mt-6 space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                  Requirements / Instructions
                </label>
                <textarea
                  {...register("requirements")}
                  rows="3"
                  placeholder="Tell the professional anything specific (e.g. 'Please bring your own ladder')"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Banknote size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Payment Method
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`relative p-5 border-2 rounded-3xl cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-emerald-500 bg-emerald-50/50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  {paymentMethod === "cod" && (
                    <CheckCircle2
                      size={18}
                      className="absolute top-4 right-4 text-emerald-600"
                    />
                  )}
                  <p className="font-black text-slate-900">Cash on Delivery</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">
                    Pay after service completion
                  </p>
                </div>

                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`relative p-5 border-2 rounded-3xl cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-indigo-500 bg-indigo-50/50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  {paymentMethod === "card" && (
                    <CheckCircle2
                      size={18}
                      className="absolute top-4 right-4 text-indigo-600"
                    />
                  )}
                  <p className="font-black text-slate-900">
                    Credit / Debit Card
                  </p>
                  <p className="text-xs text-slate-500 font-bold mt-1">
                    Secure online payment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[40px] p-8 shadow-xl border border-indigo-50 sticky top-10">
              <h3 className="text-xl font-black text-slate-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-bold text-sm uppercase tracking-wider">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold text-sm uppercase tracking-wider">
                  <span>Booking Fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      Total Amount
                    </span>
                    <span className="text-indigo-600 font-black text-4xl leading-none tracking-tight">
                      ${totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-[24px] font-black text-lg transition-all active:scale-95 shadow-lg ${
                  loading
                    ? "bg-slate-300 cursor-not-allowed"
                    : paymentMethod === "cod"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-slate-950 hover:bg-black text-white"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : paymentMethod === "cod" ? (
                  "Confirm Order"
                ) : (
                  "Pay Now"
                )}
              </button>

              <div className="mt-8 pt-8 border-t border-slate-50 flex items-start gap-3 text-slate-400">
                <ShieldCheck
                  size={20}
                  className="text-emerald-500 shrink-0 mt-0.5"
                />
                <p className="text-[10px] font-bold leading-relaxed uppercase">
                  {paymentMethod === "cod"
                    ? "Security Policy: You will pay the professional directly once the service is completed to your satisfaction."
                    : "Payments are securely processed and encrypted. Your details are never stored on our servers."}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
