import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { FaUser, FaEnvelope, FaLock, FaStar } from "react-icons/fa";

const Signup = () => {
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "client",
    },
  });

  const fixedRole = "client";

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("data", data);
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
    <div className="min-h-screen flex font-sans bg-surface-main">
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative p-16 flex-col justify-between overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-150 h-150 bg-indigo-600/10 rounded-full blur-[120px]" />

        <div className="flex items-center gap-2 relative z-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl">
            Q
          </div>
          <span className="text-2xl font-black text-white tracking-tight">
            QuickService
          </span>
        </div>

        <div className="space-y-6 relative z-10 my-auto max-w-md">
          <h2 className="text-4xl font-black text-white leading-tight tracking-tight">
            Find trusted professionals for any task, anytime.
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Join thousands of users who get their home repairs, technical tasks,
            and professional projects managed smoothly.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-marketplace p-6 relative z-10">
          <div className="flex gap-1 text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
          <p className="text-white font-medium text-sm italic mb-4">
            "QuickService changed how I hire professionals in Karachi. Quick,
            uniform layout and highly reliable!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center">
              UP
            </div>
            <div>
              <h4 className="text-white text-xs font-black">Usman P.</h4>
              <p className="text-slate-400 text-[10px] font-medium">
                Verified Consumer
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-5 md:px-12">
        <div className="w-full max-w-md space-y-8 bg-white lg:bg-transparent p-8 md:p-12 lg:p-0 rounded-[2.5rem] border border-slate-100 lg:border-none shadow-xl shadow-slate-100/50 lg:shadow-none">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-content-heading tracking-tight">
              Create an account
            </h1>
            <p className="text-content-body text-sm font-medium">
              Join{" "}
              <span className="text-indigo-600 font-bold">QuickService</span>{" "}
              today. It takes less than a minute.
            </p>
          </div>

          <div className="flex justify-center w-full overflow-hidden pt-1">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await axios.post(`${base_url}/auth/google`, {
                    credential: credentialResponse.credential,
                    role: fixedRole,
                  });
                  Cookies.set("token", res.data.token);
                  notify({
                    message: "Welcome to QuickService!",
                    status: "success",
                  });
                  navigate("/");
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

          <div className="flex items-center gap-4 py-2">
            <hr className="flex-1 border-surface-border" />
            <span className="text-content-muted text-[10px] font-black uppercase tracking-widest">
              or signup with email
            </span>
            <hr className="flex-1 border-surface-border" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="space-y-4">
              <div className="relative flex items-center">
                <FaUser
                  className="absolute left-4 text-content-muted"
                  size={16}
                />
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Full Name"
                  className="w-full border border-surface-border focus:border-brand-primary outline-none py-4 pl-12 pr-4 rounded-xl bg-slate-50/50 focus:bg-white text-content-heading font-medium text-sm transition-all shadow-inner"
                />
              </div>

              <div className="relative flex items-center">
                <FaEnvelope
                  className="absolute left-4 text-content-muted"
                  size={16}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  {...register("email", { required: "Email is required" })}
                  className="w-full border border-surface-border focus:border-brand-primary outline-none py-4 pl-12 pr-4 rounded-xl bg-slate-50/50 focus:bg-white text-content-heading font-medium text-sm transition-all shadow-inner"
                />
              </div>

              <div className="relative flex items-center">
                <FaLock
                  className="absolute left-4 text-content-muted"
                  size={16}
                />
                <input
                  type="password"
                  placeholder="Create Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full border border-surface-border focus:border-brand-primary outline-none py-4 pl-12 pr-4 rounded-xl bg-slate-50/50 focus:bg-white text-content-heading font-medium text-sm transition-all shadow-inner"
                />
              </div>
            </div>

            <p className="text-[11px] text-content-muted font-semibold leading-normal px-1">
              By continuing, you agree to our{" "}
              <span className="text-brand-primary hover:underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-brand-primary hover:underline cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>

            <button
              type="submit"
              disabled={loading}
              className="bg-slate-950 rounded-xl hover:bg-brand-primary text-white py-4 rounded-marketplace font-bold text-sm tracking-wide transition-all duration-300 shadow-md active:scale-95 mt-2 flex items-center justify-center"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="text-sm text-center pt-2">
            <span className="text-content-body font-medium">
              Already have an account?
            </span>{" "}
            <Link
              to="/login"
              className="text-brand-primary font-black text-indigo-600 hover:underline ml-1"
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
