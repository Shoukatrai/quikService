import React from "react";
import SellerCard from "./cards/SellerCard";

const Profiles = ({ sellers }) => {

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
      <div className="flex flex-wrap justify-center md:justify-start gap-6">
        {sellers.map((seller) => (
          <SellerCard
            key={seller._id || seller.id} 
            sellerData={seller}
          />
        ))}
      </div>
    </div>
  );
};

export default Profiles;
