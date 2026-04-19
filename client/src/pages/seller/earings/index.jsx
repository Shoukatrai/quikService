import React from "react";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
const Earnings = () => {
  const userData = useSelector((state) => state.user);
  return (
    <SellerDashboardLayout user={userData}>Earnings</SellerDashboardLayout>
  );
};

export default Earnings;
