import React, { useEffect, useState } from "react";
import HeroSection from "../components/Hero";
import Navbar from "../components/Navbar";
import Profiles from "../components/Profiles";
import axios from "axios";
import Cookies from "js-cookie";

const Home = () => {
  const [sellers, setSellers] = useState([]);

  const fetchSellerProfiles = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/seller/get_all_sellers`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );

      setSellers(response.data.sellers);
    } catch (err) {
      console.error("Error fetching sellers:", err);
    }
  };

  useEffect(() => {
    fetchSellerProfiles();
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      {/* Pass the fetched data to your Profiles component */}
      <Profiles sellers={sellers} />
    </>
  );
};

export default Home;
