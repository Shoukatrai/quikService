import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  User,
  Lock,
  Globe,
  Camera,
  Save,
  Loader2,
  X,
  Plus,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { notify } from "../../../utils";
import { useForm } from "react-hook-form";

const Settings = () => {
  const { user } = useSelector((state) => state.user);
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  // 1. React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
  } = useForm();

  const fetchDetails = useCallback(async () => {
    try {
      const res = await axios.get(`${base_url}/seller/get_seller`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      if (res.data.seller) {
        reset(res.data.seller);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }, [base_url, reset]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const onUpdateProfile = async (data) => {
    try {
      const updatedData = Object.keys(dirtyFields).reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});

      if (Object.keys(updatedData).length === 0) {
        return notify({ message: "No changes to save", status: "info" });
      }

      const response = await axios.patch(
        `${base_url}/seller/update_seller_details`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        },
      );
      console.log(response.data);
      if (response.data.success) {
        notify({ message: "Profile Updated Successfully", status: "success" });
        reset(data);
      }
    } catch (error) {
      notify({
        message: error.message || "Failed to update profile",
        status: "error",
      });
    }
  };

  // 4. Skills Logic (Instant DB Update)
  const currentSkills = watch("skills") || [];

  const addSkill = async () => {
    const trimmedSkill = skillInput.trim();
    if (!trimmedSkill) return;

    // Duplicate check frontend par hi karle taake faltu API call na ho
    if (currentSkills.includes(trimmedSkill)) {
      return notify({ message: "Skill already exists", status: "info" });
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        `${base_url}/seller/update_seller_skills`,
        { skill: trimmedSkill },
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        },
      );

      if (res.data.success) {
        setValue("skills", res.data.seller.skills);
        setSkillInput("");
        notify({ message: "Skill Added", status: "success" });
      }
    } catch (err) {
      notify({
        message: err.response?.data?.message || "Error",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (skill) => {
    try {
      const res = await axios.patch(
        `${base_url}/seller/delete_seller_skill`,
        { skill }, 
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        },
      );

      if (res.data.success) {
        setValue("skills", res.data.seller.skills);
        notify({ message: "Skill removed successfully", status: "success" });
      }
    } catch (err) {
      notify({
        message: err.response?.data?.message || "Error removing skill",
        status: "error",
      });
    }
  };

  // 5. Password Update Logic
  const onUpdatePassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      return notify({ message: "Passwords do not match", status: "error" });
    }
    try {
      const res = await axios.patch(
        `${base_url}/auth/update_password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } },
      );
      if (res.data.success) {
        notify({ message: "Password Changed!", status: "success" });
        setValue("currentPassword", "");
        setValue("newPassword", "");
        setValue("confirmPassword", "");
      } else {
        notify({ message: res.data.message, status: "error" });
      }
    } catch (error) {
      notify({
        message: error.response?.data?.message || error.message || "Error",
        status: "error",
      });
    }
  };

  // 6. Image Upload
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

      await axios.put(
        `${base_url}/seller/update_profile_picture`,
        { url },
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        },
      );
      setValue("profilePicture", url);
      notify({ message: "Avatar Updated!", status: "success" });
    } catch (err) {
      notify({ message: err.message || "Upload failed", status: "error" });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Public Profile", icon: <User size={18} /> },
    { id: "business", label: "Business Details", icon: <Globe size={18} /> },
    { id: "skills", label: "Skills", icon: <Plus size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
  ];

  return (
    <SellerDashboardLayout user={user}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-500 hover:bg-white"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-4xl p-6 md:p-10 shadow-sm border border-slate-100"
          >
            <form
              onSubmit={handleSubmit(
                activeTab === "security" ? onUpdatePassword : onUpdateProfile,
              )}
            >
              {activeTab === "profile" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-3xl bg-slate-100 overflow-hidden border-4 border-white shadow-md">
                        <img
                          src={
                            watch("profilePicture") ||
                            "https://ui-avatars.com/api/?name=Seller"
                          }
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg"
                      >
                        <Camera size={16} />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">
                        Profile Photo
                      </h4>
                      <p className="text-sm text-slate-400">
                        Update your avatar from here.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Display Name
                      </label>
                      <input
                        {...register("businessName")}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Phone Number
                      </label>
                      <input
                        {...register("phoneNumber")}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-bold text-slate-700">
                        Bio
                      </label>
                      <textarea
                        {...register("bio")}
                        rows="4"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: BUSINESS */}
              {activeTab === "business" && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Category
                    </label>
                    <select
                      {...register("category")}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                    >
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Cleaning">Cleaning</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      {...register("pricing.rate")}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      City
                    </label>
                    <input
                      {...register("location.city")}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Availability Status
                    </label>
                    <div className="flex p-1 bg-slate-100 rounded-2xl">
                      {["available", "onbreak"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() =>
                            setValue("availability", s, { shouldDirty: true })
                          }
                          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${watch("availability") === s ? "bg-white shadow-sm text-indigo-600" : "text-slate-500"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SKILLS (Individual Updates) */}
              {activeTab === "skills" && (
                <div className="space-y-8">
                  <div className="flex gap-2">
                    <input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add a skill..."
                      className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-6 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {currentSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold text-sm border border-indigo-100"
                      >
                        {skill}{" "}
                        <X
                          size={14}
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => deleteSkill(skill)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SECURITY */}
              {activeTab === "security" && (
                <div className="max-w-md space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      {...register("currentPassword")}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      {...register("newPassword")}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      {...register("confirmPassword")}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* ACTION BUTTON (Hide for Skills as it updates instantly) */}
              {activeTab !== "skills" && (
                <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={
                      isSubmitting || (activeTab !== "security" && !isDirty)
                    }
                    className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Save size={18} />
                    )}
                    {activeTab === "security"
                      ? "Update Password"
                      : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

export default Settings;
