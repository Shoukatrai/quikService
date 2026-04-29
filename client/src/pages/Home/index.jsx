import React from "react";
import {
  Navbar,
  HeroSection,
  Categories,
  FeaturedGigs,
  HowItWorks,
  BecomeProvider,
  Footer,
} from "../../components";

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
