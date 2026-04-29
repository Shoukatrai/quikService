import AuthRoutes from "../Routes/AuthRoutes";
import SellerRoute from "../Routes/SellerRoute";
import AdminHome from "./admin/Home";
import AdminVerificationPage from "./admin/SellerVerification/SellerVerification";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Checkout from "./client/CheckOut";
import JobDetails from "./client/JobDetails";
import MyBookings from "./client/MyBookings";
import ClientProfile from "./client/Profile";
import ServicesPage from "./client/Services";
import Home from "./Home";
import NotFound from "./NotFound";
import BecomeSeller from "./seller/BecomeSeller";
import Earnings from "./seller/earings";
import MyGigs from "./seller/gigs";
import CreateGig from "./seller/gigs/CreateGig";
import SellerHome from "./seller/Home";
import MyJobs from "./seller/myJobs";
import Settings from "./seller/setting";
import Verification from "./seller/verification";



export  {
  AdminHome,
  SellerHome,
  AuthRoutes,
  Signup,
  Login,
  MyJobs,
  Earnings,
  Settings,
  Verification,
  BecomeSeller,
  SellerRoute,
  NotFound,
  Home,
  MyGigs,
  CreateGig,
  JobDetails,
  Checkout,
  MyBookings,
  ClientProfile,
  ServicesPage,
  AdminVerificationPage
};
