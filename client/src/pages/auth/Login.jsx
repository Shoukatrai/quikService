import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils";
import Cookies from "js-cookie";
import { setUser } from "../../store/counterSlice";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { FaEnvelope, FaLock, FaStar } from "react-icons/fa";

const Login = () => {
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const handleLoginSuccess = (userData) => {
    dispatch(setUser(userData));
    const { role } = userData;
    if (role === "seller") navigate("/seller-dashboard");
    else navigate("/");
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`${base_url}/auth/login`, data);
      console.log(response.data);
      notify({ message: "Logged in successfully!", status: "success" });
      Cookies.set("token", response.data.token, { expires: 7, secure: true });
      reset();
      handleLoginSuccess(response.data.data);
    } catch (error) {
      notify({
        message: error.response?.data?.message || "Login failed",
        status: "error",
      });
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
            Welcome back! Connect with experts instantly.
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Log in to manage your appointments, tracking schedules, orders data,
            and get quick access to top premium tier solutions.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-marketplace p-6 relative z-10">
          <div className="flex gap-1 text-amber-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
          <p className="text-white font-medium text-sm italic mb-4">
            "Managing my ongoing bookings on QuickService is so seamless.
            Dashboard load times are extremely fast!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center">
              UP
            </div>
            <div>
              <h4 className="text-white text-xs font-black">Usman P.</h4>
              <p className="text-slate-400 text-[10px] font-medium">
                Verified Client
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 md:px-12">
        <div className="w-full max-w-md space-y-8 bg-white lg:bg-transparent p-8 md:p-12 lg:p-0 rounded-[2.5rem] border border-slate-100 lg:border-none shadow-xl shadow-slate-100/50 lg:shadow-none">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-content-heading tracking-tight">
              Welcome back
            </h1>
            <p className="text-content-body text-sm font-medium">
              Log in to your{" "}
              <span className="text-indigo-600 font-bold">QuickService</span>{" "}
              account
            </p>
          </div>

          <div className="flex justify-center w-full overflow-hidden pt-2">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await axios.post(`${base_url}/auth/google`, {
                    credential: credentialResponse.credential,
                  });
                  Cookies.set("token", res.data.token, { expires: 7 });
                  notify({
                    message: "Google Login Successful!",
                    status: "success",
                  });
                  handleLoginSuccess(res.data.data);
                } catch (err) {
                  notify({
                    message: err.message || "Google Auth Failed",
                    status: "error",
                  });
                }
              }}
              onError={() =>
                notify({ message: "Login Failed", status: "error" })
              }
              shape="pill"
              theme="outline"
              width="100%"
            />
          </div>

          <div className="flex items-center gap-4 py-2">
            <hr className="flex-1 border-surface-border" />
            <span className="text-content-muted text-[10px] font-black uppercase tracking-widest">
              or login with email
            </span>
            <hr className="flex-1 border-surface-border" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="space-y-4">
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
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full border border-surface-border focus:border-brand-primary outline-none py-4 pl-12 pr-4 rounded-xl bg-slate-50/50 focus:bg-white text-content-heading font-medium text-sm transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="flex justify-end px-1">
              <span className="text-xs font-bold text-brand-primary hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-slate-950 hover:bg-brand-primary rounded-xl text-white py-4 rounded-marketplace font-bold text-sm tracking-wide transition-all duration-300 shadow-md active:scale-95 mt-2"
            >
              {loading ? "Signing in..." : "Log in"}
            </button>
          </form>

          <div className="text-sm text-center pt-2">
            <span className="text-content-body font-medium">
              New to QuickService?
            </span>{" "}
            <Link
              to="/signup"
              className="text-brand-primary font-black text-indigo-600 hover:underline ml-1"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
