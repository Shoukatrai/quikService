import React from "react";
import Navbar from "../../components/Navbar";
import HeroSection from "../../components/Hero";
import FeaturedGigs from "../../components/FeaturedGigs";
import HowItWorks from "../../components/HowItWorks";
import BecomeProvider from "../../components/BecomeProvider";
import Footer from "../../components/Footer";
import Categories from "../../components/Categories";

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <HeroSection />
      <Categories />
      
      {/* Ab sirf component call karein */}
      <FeaturedGigs />
      <HowItWorks />
      <BecomeProvider />
      <Footer />

      {/* Aap yahan mazeed sections add kar sakte hain easily */}
    </div>
  );
};

export default Home;