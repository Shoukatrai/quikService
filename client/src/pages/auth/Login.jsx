import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils";
import Cookies from "js-cookie";
import { setUser } from "../../store/counterSlice";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-4xl shadow-xl shadow-slate-200/50 flex flex-col gap-6 border border-slate-100">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm">
              Log in to your{" "}
              <span className="text-blue-600 font-semibold">QuikService</span>{" "}
              account
            </p>
          </div>

          <div className="flex justify-center w-full overflow-hidden">
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

          <div className="flex items-center gap-4">
            <hr className="flex-1 border-slate-100" />
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              or login with email
            </span>
            <hr className="flex-1 border-slate-100" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email address"
                {...register("email", { required: "Email is required" })}
                className="w-full border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none p-4 rounded-2xl bg-slate-50 transition-all"
              />
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none p-4 rounded-2xl bg-slate-50 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg"
            >
              {loading ? "Signing in..." : "Log in"}
            </button>
          </form>

          <div className="text-sm text-center">
            <span className="text-slate-500 font-medium">
              New to QuikService?
            </span>{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-bold hover:underline"
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
