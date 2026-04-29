import React, { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import ClientGigCard from "../../components/cards/ClientGigCard";
import { Footer, Navbar } from "../../components";

const ServicesPage = () => {
  const [gigs] = useState([
    {
      _id: "1",
      title: "Premium Modern UI/UX Design for SaaS Startups",
      description:
        "We create high-converting dashboard designs and mobile app interfaces with a focus on usability.",
      thumbnail:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      rating: 4.9,
      totalReviews: 124,
      category: "Design",
      location: "San Francisco, CA",
      price: 45,
      priceType: "hourly",
      tags: ["Figma", "SaaS"],
    },
    // ... aur data yahan add karein
  ]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* 1. Header & Search Section */}
        <header className="bg-white border-b border-slate-100 pt-10 pb-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">
                  Marketplace
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-4 tracking-tight">
                  Find the best <span className="text-indigo-600">expert</span>{" "}
                  services.
                </h1>
                <p className="text-slate-500 text-lg">
                  Explore thousands of high-quality services tailored for your
                  business growth.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-[400px]">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-slate-700 font-medium"
                />
              </div>
            </div>
          </div>
        </header>

        {/* 2. Filters Bar */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shrink-0">
                <SlidersHorizontal size={16} /> Filters
              </button>
              {["Design", "Development", "Marketing", "Writing", "Video"].map(
                (cat) => (
                  <button
                    key={cat}
                    className="px-5 py-2 hover:bg-slate-100 rounded-xl text-sm font-semibold text-slate-600 transition-colors shrink-0"
                  >
                    {cat}
                  </button>
                ),
              )}
            </div>

            <div className="hidden md:flex items-center gap-2 text-slate-500 text-sm font-bold cursor-pointer">
              Sort by: <span className="text-slate-900">Recommended</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* 3. Main Content - Gigs Grid */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Results Info */}
          <div className="flex justify-between items-center mb-10">
            <p className="text-slate-500 font-medium">
              Showing <span className="text-slate-900 font-bold">1,240</span>{" "}
              available services
            </p>
          </div>

          {/* The Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
            {gigs.map((gig) => (
              <ClientGigCard key={gig._id} gig={gig} />
            ))}
            {/* Loop ko repeat karein for UI demo */}
            {[...Array(5)].map((_, i) => (
              <ClientGigCard key={i} gig={gigs[0]} />
            ))}
          </div>

          {/* 4. Pagination / Load More */}
          <div className="mt-20 flex justify-center">
            <button className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
              Load More Services
            </button>
          </div>
        </main>

        {/* 5. Simple Footer Call-to-action */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="bg-indigo-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4">
                Ready to start your project?
              </h2>
              <p className="text-indigo-100 mb-8 max-w-md mx-auto">
                Post your requirements and let the best experts find you.
              </p>
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
                Post a Job for Free
              </button>
            </div>
            {/* Decorative Circles */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-indigo-500 rounded-full opacity-50" />
            <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-indigo-700 rounded-full opacity-50" />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;
