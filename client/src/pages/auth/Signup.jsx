import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";

const Signup = () => {
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "client",
    },
  });

  const selectedRole = watch("user");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("data" , data);
      const res = await axios.post(`${base_url}/auth/signup`, data);
      notify({
        message: res.data.message || "Account created!",
        status: "success",
      });
      navigate("/login");
    } catch (error) {
      const errMsg = error.response?.data?.message || "Signup failed.";
      notify({ message: errMsg, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 flex flex-col gap-6 border border-slate-100">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Create account
            </h1>
            <p className="text-slate-500 text-sm">
              Join{" "}
              <span className="text-blue-600 font-semibold">QuikService</span>
            </p>
          </div>

          <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-1">
            <label
              className={`flex-1 flex items-center justify-center py-3 rounded-xl cursor-pointer transition-all font-bold text-sm ${selectedRole === "client" ? "bg-white shadow-sm text-blue-600" : "text-slate-500"}`}
            >
              <input
                type="radio"
                {...register("role")}
                value="client"
                className="hidden"
              />
              Client
            </label>
            <label
              className={`flex-1 flex items-center justify-center py-3 rounded-xl cursor-pointer transition-all font-bold text-sm ${selectedRole === "seller" ? "bg-white shadow-sm text-slate-900" : "text-slate-500"}`}
            >
              <input
                type="radio"
                {...register("role")}
                value="seller"
                className="hidden"
              />
              Professional
            </label>
          </div>

          <div className="flex justify-center w-full overflow-hidden">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await axios.post(`${base_url}/auth/google`, {
                    credential: credentialResponse.credential,
                    role: selectedRole, 
                  });
                  Cookies.set("token", res.data.token);
                  notify({
                    message: "Welcome to QuikService!",
                    status: "success",
                  });
                  navigate(
                    selectedRole === "seller" ? "/seller-dashboard" : "/",
                  );
                } catch (err) {
                  console.log(err);
                  notify({ message: "Google Auth Failed", status: "error" });
                }
              }}
              shape="pill"
              theme="outline"
              text="signup_with"
              width="100%"
            />
          </div>

          <div className="flex items-center gap-4">
            <hr className="flex-1 border-slate-100" />
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              or email
            </span>
            <hr className="flex-1 border-slate-100" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-4">
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Full Name"
                className="w-full border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none p-4 rounded-2xl bg-slate-50 transition-all"
              />
              <input
                type="email"
                placeholder="Email address"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none p-4 rounded-2xl bg-slate-50 transition-all"
              />
              <input
                type="password"
                placeholder="Create Password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none p-4 rounded-2xl bg-slate-50 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg mt-2"
            >
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>

          <div className="text-sm text-center">
            <span className="text-slate-500 font-medium">
              Already have an account?
            </span>{" "}
            <Link
              to="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
