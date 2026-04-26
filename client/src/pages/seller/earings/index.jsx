import React from "react";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
const Earnings = () => {
   const { user } = useSelector((state) => state.user);
    console.log("user" , user);
  return (
    <SellerDashboardLayout user={user}>Earnings</SellerDashboardLayout>
  );
};

export default Earnings;
