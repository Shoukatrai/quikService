import React from "react";
import SellerDashboardLayout from "../../../components/sellerDash/DashboardLayout";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import SellerCard from "../../../components/cards/SellerCard";
const SellerHome = () => {
  const dummySeller = {
    // User Basics (from /auth/me)
    name: "Arsalan Khan",
    email: "arsalan.pro@example.com",
    phoneNumber: "+92 347 3127706",
    profilePicture:
      "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=400&fit=crop",

    // Seller Profile Details (from /seller/get_seller)
    bio: "Professional plumber with over 8 years of experience in residential and commercial repairs. Expert in leak detection and smart home water systems.",
    businessName: "Khan Plumbing & Maintenance",
    category: "Plumbing",
    hourlyRate: 45,
    serviceRadius: 25,
    skills: [
      "Pipe Repair",
      "Gas Leak Detection",
      "Water Heater Installation",
      "Drain Cleaning",
      "Emergency Services",
    ],

    // Professional Stats
    isVerified: true,
    status: "Available", // or "On Break"
    location: "Karachi, Pakistan",
    rating: 4.8,
    totalReviews: 124,

    // Portfolio Highlights (Image URLs)
    portfolio: [
      "https://images.unsplash.com/photo-1581244276891-6bc3a2f32746?w=300",
      "https://images.unsplash.com/photo-1504148455328-4972fef88d24?w=300",
    ],

    // Timestamps
    joinedDate: "2024-01-15T10:30:00Z",
  };

  const userData = useSelector((state) => state.user);
  console.log("userData", userData);
  return (
    <SellerDashboardLayout user={userData}>
      <SellerCard sellerData={dummySeller} />
    </SellerDashboardLayout>
  );
};

export default SellerHome;
