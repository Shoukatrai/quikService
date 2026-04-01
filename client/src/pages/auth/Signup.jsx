import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils";
import { AiOutlineGoogle } from "react-icons/ai";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
const Signup = () => {
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      user: "client",
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = await axios.post(`${base_url}/auth/signup`, data);
      notify({ message: user.data.message, status: "success" });
      reset();
      navigate("/login");
    } catch (error) {
      notify({ message: error.message, status: "false" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Create your account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Join QuikService and start connecting with professionals
          </p>
        </div>
        {/* Username */}
        <div>
          <label className="text-sm font-medium text-gray-700">Full name</label>
          <input
            {...register("username", { required: "Name is required" })}
            placeholder="John Doe"
            className="mt-1 w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-2 rounded-md"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
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
            placeholder="At least 8 characters"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Must be at least 8 characters" },
            })}
            className="mt-1 w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none p-2 rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <hr className="w-1/4 border-gray-300" />
          <span className="text-gray-400 text-sm">or</span>
          <hr className="w-1/4 border-gray-300" />
        </div>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const res = await axios.post(`${base_url}/auth/google`, {
                credential: credentialResponse.credential,
              });
              notify({
                type: "success",
                message: res.message,
              });
              Cookies.set("token", res.data.token);
              navigate("/");
            } catch (err) {
              console.log(err);
              notify({
                type: "error",
                message: err.message,
              });
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        <div className="text-sm text-center mt-3">
          <span className="text-gray-600">Already using QuikService? </span>
          <Link
            to="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            Log in
          </Link>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-md font-medium"
        >
          Create account
        </button>
        <p className="text-xs text-gray-400 text-center">
          By signing up, you agree to our terms & privacy policy
        </p>
      </form>
    </div>
  );
};

export default Signup;
