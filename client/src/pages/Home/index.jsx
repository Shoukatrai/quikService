import React, { useEffect, useState } from "react";
import HeroSection from "../../components/Hero";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import ClientGigCard from "../../components/cards/ClientGigCard";

const Home = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGigs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/post/get-user-posts`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(response.data.gigs);
      setGigs(response.data.gigs || []);
    } catch (err) {
      console.error("Error fetching gigs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">
              Featured Services
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Explore the best services from our trusted professionals.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-20 border-t-indigo-600 mb-4"></div>
            <p className="text-slate-400 font-bold animate-pulse text-sm">
              Finding best services for you...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {gigs.map((gig) => (
              <ClientGigCard key={gig._id} gig={gig} />
            ))}
          </div>
        )}

        {!loading && gigs.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-xl">
              No services available right now.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
