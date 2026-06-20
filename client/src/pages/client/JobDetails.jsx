import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  Zap,
  ArrowLeft,
  Info,
} from "lucide-react";
import { setGig } from "../../store/gigSlice";
import Cookies from "js-cookie";
import { Footer, Navbar } from "../../components";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const base_url = import.meta.env.VITE_BACKEND_URL;

  // Redux States (Accessing state.gig.gig as per your slice)
  const reduxGig = useSelector((state) => state.gig.gig);
  console.log("redux", reduxGig);

  // Local States
  const [selectedGig, setSelectedGig] = useState(
    reduxGig?._id === id ? reduxGig : null,
  );
  const [loading, setLoading] = useState(reduxGig?._id === id ? false : true);
  const [activeImage, setActiveImage] = useState(null);

  const token = Cookies.get("token");

  // Fetch Function
  const fetchGig = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/post/get-single-post/${id}`);
      const fetchedData = res.data.post;

      setSelectedGig(fetchedData);
      setActiveImage(fetchedData.thumbnail);
      dispatch(setGig(fetchedData));
    } catch (err) {
      console.error("Error fetching gig:", err);
    } finally {
      setLoading(false);
    }
  }, [id, base_url, dispatch]);

  // Lifecycle logic - Optimized to prevent infinite loops
  useEffect(() => {
    if (!reduxGig || reduxGig._id !== id) {
      fetchGig();
    } else {
      setSelectedGig(reduxGig);
      setActiveImage(reduxGig.thumbnail);
      setLoading(false);
    }
  }, [id, fetchGig]); // reduxGig removed from dependency to stop re-render loops

  const handleBooking = () => {
    if (!token) {
      navigate("/login", { state: { from: `/job-details/${id}` } });
    } else {
      navigate(`/checkout/${id}`);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 mb-4"></div>
        <p className="text-slate-500 font-bold">Loading Service Details...</p>
      </div>
    );

  if (!selectedGig)
    return (
      <div className="h-screen flex flex-col items-center justify-center font-bold text-slate-400">
        <Info size={48} className="mb-4 text-slate-200" />
        Gig Not Found!
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-indigo-600 underline"
        >
          Back to Home
        </button>
      </div>
    );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Services
          </button>
          <span className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">
            Job ID: {id.slice(-6)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* LEFT: Media & Info Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-3 rounded-[40px] shadow-sm border border-slate-100">
              <div className="overflow-hidden rounded-[32px] aspect-video bg-slate-100">
                <img
                  src={activeImage || selectedGig?.thumbnail}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  alt={selectedGig?.title}
                />
              </div>
              <div className="flex gap-4 p-4 overflow-x-auto no-scrollbar">
                {[selectedGig?.thumbnail, ...(selectedGig?.images || [])].map(
                  (img, i) => (
                    <img
                      key={i}
                      src={img}
                      onClick={() => setActiveImage(img)}
                      className={`w-24 h-20 rounded-2xl object-cover cursor-pointer transition-all border-2 
                        ${activeImage === img ? "border-indigo-600 scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {selectedGig?.category}
                </span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                {selectedGig?.title}
              </h1>
              <div className="flex flex-wrap gap-6 mb-10 pb-8 border-b border-slate-50">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <MapPin size={18} className="text-indigo-500" />{" "}
                  {selectedGig?.location}
                </div>
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Star
                    size={18}
                    className="text-amber-500"
                    fill="currentColor"
                  />{" "}
                  {selectedGig?.rating}{" "}
                  <span className="text-slate-400 font-medium">
                    ({selectedGig?.totalReviews} reviews)
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Service Description
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                {selectedGig?.description}
              </p>
            </div>
          </div>

          {/* RIGHT: STICKY SIDEBAR */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Booking Card */}
            <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200/50 border border-indigo-50">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">
                    Starting from
                  </p>
                  <h2 className="text-5xl font-black text-slate-950 tracking-tighter">
                    Rs.{selectedGig?.price}
                  </h2>
                </div>
                <span className="bg-slate-50 px-4 py-2 rounded-xl text-xs font-black text-slate-500 uppercase border border-slate-100">
                  {selectedGig?.priceType}
                </span>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                  <Clock size={20} className="text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-tight">
                    On-Time Delivery
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                  <ShieldCheck size={20} className="text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-tight">
                    Secure Payment
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBooking}
                  className="w-full bg-indigo-600 text-white py-5 rounded-[20px] font-black text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  <Zap size={20} fill="currentColor" /> Book Service
                </button>
                <button className="w-full bg-slate-950 text-white py-5 rounded-[20px] font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all">
                  <MessageCircle size={20} /> Contact Seller
                </button>
              </div>

              <p className="mt-6 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                <Info size={14} className="inline mr-1" /> No hidden charges
              </p>

              {/* MINI SELLER CARD INSIDE STICKY WRAPPER */}
              <div className="bg-slate-50 rounded-3xl p-5 flex items-center justify-between border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 font-black shadow-sm overflow-hidden">
                    {selectedGig?.seller?.profilePic ? (
                      <img
                        src={selectedGig.seller.profilePic}
                        className="w-full h-full object-cover"
                        alt="S"
                      />
                    ) : (
                      selectedGig?.seller?.name?.charAt(0) || "S"
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm truncate w-24">
                      {selectedGig?.seller?.name || "Verified Provider"}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">
                      Pro Seller
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(`/seller-profile/${selectedGig?.seller?._id}`)
                  }
                  className="text-indigo-600 font-black text-xs hover:underline"
                >
                  Profile
                </button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                Powered by QuickService
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetails;
