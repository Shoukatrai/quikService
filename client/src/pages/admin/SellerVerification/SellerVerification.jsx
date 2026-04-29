import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  Download,
  ExternalLink,
  ShieldCheck,
  Mail,
  Calendar,
  FileText,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminDashboardLayout from "../../../components/adminDash/AdminDashboard";
import Cookies from "js-cookie";
import axios from "axios";

const AdminVerificationPage = () => {
  const base_url = import.meta.env.VITE_BACKEND_URL;

  // --- States ---
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // 1. Fetch All Unverified Sellers
  const fetchUnverifiedSellers = async () => {
    setFetching(true);
    try {
      const response = await axios.get(
        `${base_url}/admin/get_unverified_sellers`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(response?.data?.requests);
      setRequests(response?.data?.requests || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setFetching(false);
    }
  };

  // 2. Approve or Reject Logic
  const handleAction = async (sellerId, status) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${base_url}/admin/verify_seller`,
        { sellerId, status },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );

      if (response.data.success) {
        setRequests((prev) => prev.filter((s) => s._id !== sellerId));
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnverifiedSellers();
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Seller Verifications
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Review and verify service providers to maintain platform trust.
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 text-sm font-bold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            {requests.length} Pending Requests
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-4">
            {fetching ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-indigo-600" size={40} />
              </div>
            ) : requests.length === 0 ? (
              <div className="p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <ShieldCheck
                  className="mx-auto text-slate-300 mb-4"
                  size={48}
                />
                <p className="text-slate-500 font-bold">
                  No pending verifications
                </p>
              </div>
            ) : (
              requests.map((request) => (
                <motion.div
                  layoutId={request._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={request._id}
                  className={`p-6 bg-white border rounded-4xl transition-all cursor-pointer group ${
                    selectedRequest?._id === request?._id
                      ? "border-indigo-500 shadow-xl shadow-indigo-500/10"
                      : "border-slate-100 shadow-sm hover:border-slate-200"
                  }`}
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-xl font-black text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors uppercase">
                        {request?.seller?.businessName?.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {request?.seller?.businessName}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500 font-medium mt-1">
                          <span className="flex items-center gap-1">
                            <Mail size={14} /> {request?.seller?.email || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <Eye size={20} />
                    </button>
                  </div>

                  <div className="mt-5 pt-5 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold border border-slate-100">
                        {request?.seller?.category || "Pro"}
                      </span>
                      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg text-xs font-bold border border-indigo-100">
                        {request?.seller?.yearsOfExperience || "0"} years
                        Experience
                      </span>
                    </div>
                    <div className="text-xs font-black text-amber-500 uppercase tracking-widest">
                      Awaiting Review
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Right Column: Detail Sidebar */}
          <div className="xl:col-span-1">
            <AnimatePresence mode="wait">
              {selectedRequest ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 sticky top-28"
                >
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-indigo-600 rounded-4xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-200 uppercase">
                      {selectedRequest?.seller?.profilePicture ? (
                        <img
                          src={selectedRequest?.seller?.profilePicture}
                          alt={selectedRequest?.seller?.businessName}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        selectedRequest?.seller?.businessName?.charAt(0)
                      )}
                    </div>
                    <h2 className="text-xl font-black text-slate-900">
                      {selectedRequest?.seller?.businessName}
                    </h2>
                    <p className="text-slate-400 font-medium text-sm">
                      Documents Review
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-4">
                        Submitted Documents
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-indigo-200 transition-all">
                          <div className="flex items-center gap-3">
                            <FileText size={18} className="text-slate-400" />
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-700">
                                {selectedRequest.docType}
                              </span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase">
                                ID: {selectedRequest.docNumber || "N/A"}
                              </span>
                            </div>
                          </div>
                          <a
                            href={selectedRequest.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-500 hover:text-indigo-700 bg-white p-2 rounded-lg shadow-sm"
                          >
                            <ExternalLink size={18} />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <button
                        onClick={() =>
                          handleAction(selectedRequest?.seller?._id, "approved")
                        }
                        disabled={loading}
                        className="w-full mb-3 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 shadow-lg shadow-emerald-100 active:scale-95 transition-all disabled:opacity-50"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : (
                          <CheckCircle size={18} />
                        )}{" "}
                        Approve Seller
                      </button>
                      <button
                        onClick={() =>
                          handleAction(selectedRequest?.seller?._id, "rejected")
                        }
                        disabled={loading}
                        className="w-full py-4 bg-white text-rose-500 border-2 border-rose-50 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-rose-50 transition-all active:scale-95 disabled:opacity-50"
                      >
                        <XCircle size={18} /> Reject Request
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <div className="flex gap-3">
                      <ShieldCheck
                        className="text-amber-600 shrink-0"
                        size={20}
                      />
                      <p className="text-[11px] text-amber-800 font-medium">
                        Verification will give this seller a "Verified Pro"
                        badge and allow them to post services.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-100 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                  <ShieldCheck size={48} className="mb-4 opacity-20" />
                  <p className="font-bold text-slate-500">
                    Select a seller from the list to start verification
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminVerificationPage;
