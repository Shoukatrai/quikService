import React from 'react'
import SellerDashboardLayout from '../../../components/sellerDash/DashboardLayout';

const SellerHome = () => {
    const userData = { name: "Alex Wright", role: "seller", isVerified: false };
  return (
    <SellerDashboardLayout user={userData}></SellerDashboardLayout>
  )
}

export default SellerHome