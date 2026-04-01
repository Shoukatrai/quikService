import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils";

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
        message: response.data.message,
        status: "success",
      });

      localStorage.setItem("token", response.data.token);
      reset();
      navigate("/");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back </h1>
          <p className="text-gray-500 text-sm mt-1">
            Log in to continue using QuikService
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
            className="mt-1 w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-2 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
            className="mt-1 w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-2 rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="text-right text-sm">
          <span className="text-blue-500 cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        <div className="text-sm text-center">
          <span className="text-gray-600">New to QuikService?</span>{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Create an account
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-md font-medium disabled:opacity-70"
        >
          {loading ? "Signing you in..." : "Log in"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Secure login • Your data is protected
        </p>
      </form>
    </div>
  );
};

export default Login;
