import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils";
import Cookies from "js-cookie";

const Login = () => {
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await axios.post(`${base_url}/auth/login`, data);
      notify({
        message: response.data.message || "Logged in successfully!",
        status: "success",
      });
      console.log("response", response.data.data.role);
      Cookies.set("token", response.data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      
      reset();

      const { role } = response.data.data;
      console.log("role", role);
      switch (role) {
        case "seller":
          navigate("/seller-dashboard");
          break;
        case "client":
          navigate("/");
          break;
        case "admin":
          navigate("/");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      notify({
        message: errorMsg,
        status: "error",
      });
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 flex flex-col gap-6 border border-slate-100"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm">
              Log in to continue using{" "}
              <span className="text-blue-600 font-semibold">QuikService</span>
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div className="group">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`mt-1.5 w-full border ${
                  errors.email ? "border-red-400" : "border-slate-200"
                } focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none p-4 rounded-2xl bg-slate-50 transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="group">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`mt-1.5 w-full border ${
                  errors.password ? "border-red-400" : "border-slate-200"
                } focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none p-4 rounded-2xl bg-slate-50 transition-all`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing you in...
              </span>
            ) : (
              "Log in"
            )}
          </button>

          <div className="text-sm text-center">
            <span className="text-slate-500 font-medium">
              New to QuikService?
            </span>{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-bold hover:underline"
            >
              Create an account
            </Link>
          </div>

          <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-semibold">
            Secure login • AES-256 Protected
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
