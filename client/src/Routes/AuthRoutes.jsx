import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
const AuthRoutes = () => {
  const token = Cookies.get("token");

  if (token) {
    return <Navigate to={"/"} />;
  } else {
    return <Outlet />;
  }
};

export default AuthRoutes;
