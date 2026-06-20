import React, { useEffect, useState } from "react";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";
import GigActionBar from "../../../components/GigActionBar";
import axios from "axios";
import Cookies from "js-cookie";
import SellerGigCard from "../../../components/cards/GigCard";
import { Loader2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MyGigs = () => {
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const [gigs, setGigs] = useState([]); // Default empty array
  const [loading, setLoading] = useState(true);

  const getAllGigs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}/post/get-all-posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log("Gigs:", res.data.services);
      setGigs(res.data.services || []);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllGigs();
  }, []);
  const { user } = useSelector((state) => state.user);

  return (
    <SellerDashboardLayout user={user}>
      <div className="p-6">
        <GigActionBar />
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="animate-spin text-indigo-600 mb-2" size={40} />
            <p className="text-slate-500 font-medium">
              Loading your services...
            </p>
          </div>
        ) : gigs.length > 0 ? (
          /* Grid Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {gigs.map((gig) => (
              <SellerGigCard
              getAllGigs = {getAllGigs}
                gig={gig}
                key={gig._id}
                onDelete={getAllGigs} // Delete ke baad refresh karne ke liye
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 mt-8">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="text-slate-300" size={30} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Gigs Found</h3>
            <p className="text-slate-500 mb-6">
              You haven't created any services yet.
            </p>
            <Link
              to="/seller-create_gig"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all inline-block"
            >
              Create Your First Gig
            </Link>
          </div>
        )}
      </div>
    </SellerDashboardLayout>
  );
};

export default MyGigs;
