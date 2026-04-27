import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ClientGigCard from "./cards/ClientGigCard";

const FeaturedGigs = () => {
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
        }
      );
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
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Featured <span className="text-indigo-600">Services</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            Explore the best services from our trusted professionals.
          </p>
        </div>
      </div>

      {/* Loading Logic */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-20 border-t-indigo-600 mb-4"></div>
          <p className="text-slate-400 font-bold animate-pulse text-sm uppercase tracking-widest">
            Finding best services for you...
          </p>
        </div>
      ) : (
        <>
          {/* Gigs Grid */}
          {gigs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {gigs.map((gig) => (
                <ClientGigCard key={gig._id} gig={gig} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold text-xl">
                No services available right now.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FeaturedGigs;