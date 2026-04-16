import React from "react";
import SellerCard from "./cards/SellerCard";

const Profiles = ({ sellers }) => {
  // 1. Check if sellers exists and has items
  if (!sellers || sellers.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500 text-lg">
          No professional service providers found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen">
      {/* 2. flex-wrap: allows cards to wrap to the next row 
        3. gap-6: adds consistent spacing between cards 
      */}
      <div className="flex flex-wrap justify-center md:justify-start gap-6">
        {sellers.map((seller) => (
          <SellerCard
            key={seller._id || seller.id} // 4. Always use a unique key
            sellerData={seller}
          />
        ))}
      </div>
    </div>
  );
};

export default Profiles;
