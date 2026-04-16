import React, { useEffect } from 'react'
import SellerDashboardLayout from '../../../components/sellerDash/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from "js-cookie"
import { setUser } from '../../../store/counterSlice';
const Earnings = () => {
   const dispatch = useDispatch();
  const base_url = import.meta.env.VITE_BACKEND_URL;
  const fetchUser = async () => {
    try {
      const user = await axios.get(
        `${base_url}/auth/me`,
        {
          headers: {
            applicationType: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log("user", user.data.user);
      dispatch(setUser(user.data.user));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const userData = useSelector((state) => state.user);
  return (
    <SellerDashboardLayout user={userData}>Earnings</SellerDashboardLayout>
  )
}

export default Earnings