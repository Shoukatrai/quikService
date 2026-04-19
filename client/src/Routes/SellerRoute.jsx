import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const SellerRoute = () => {
  const user = useSelector((state) => state.user);
  const token = Cookies.get("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (token && !user) {
    return (
      <div className="flex h-screen items-center justify-center font-bold text-indigo-600">
        <div className="animate-pulse">Verifying Access...</div>
      </div>
    );
  }

  if (user && user.role === "seller") {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default SellerRoute;
