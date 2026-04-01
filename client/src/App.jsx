import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, OAuthSuccess, Signup } from "./pages";
import { Bounce, ToastContainer } from "react-toastify";
import AuthRoutes from "./Routes/AuthRoutes";
import Home from "./pages/Home";
import SellerHome from "./pages/seller/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
          <Route path="/" element={<  Home />} />
          <Route path="/seller-dashboard" element={< SellerHome />} />

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
