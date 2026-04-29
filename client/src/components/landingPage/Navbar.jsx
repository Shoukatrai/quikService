import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Briefcase,
  Settings as SettingsIcon,
  Bell,
  Circle,
  ChevronRight,
  Home,
  Smartphone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { removeUser } from "../../store/counterSlice";
import { MdAdminPanelSettings, MdDashboardCustomize } from "react-icons/md";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const token = Cookies.get("token");

  // --- Functions ---

  const fetchNotifications = async () => {
    if (!token || !user) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/notification/get-all-notifications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleMarkAsRead = async () => {
    try {
      setUnreadCount(0);
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/notifications/mark-read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(removeUser());
    setShowProfileMenu(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  // --- Effects ---

  useEffect(() => {
    fetchNotifications();
  }, [location.pathname, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Find Services", href: "/services" },
    { name: "Become a Provider", href: "/become-seller" },
    { name: "How It Works", href: "/become-seller" },
    { name: "About", href: "/become-seller" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* 1. Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 transform group-hover:rotate-6 transition-transform">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Quick<span className="text-indigo-600">Service</span>
            </span>
          </Link>

          {/* 2. Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `transition-colors font-bold text-sm ${isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* 3. Action Buttons & Profile */}
          <div className="flex items-center gap-3">
            {token && user ? (
              <>
                {/* Notification Bell Icon */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="relative p-2.5 bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-all active:scale-90"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown Trigger */}
                <div className="relative hidden md:block" ref={menuRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1 pr-3 bg-slate-50 border border-slate-200 rounded-full hover:shadow-md transition-all active:scale-95"
                  >
                    <img
                      src={
                        user?.profilePicture ||
                        `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`
                      }
                      className="w-8 h-8 rounded-full object-cover border border-white"
                      alt="Profile"
                    />
                    <span className="text-sm font-bold text-slate-700">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-slate-50 mb-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Signed in as
                          </p>
                          <p className="text-xs font-bold text-slate-700 truncate">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          to="/my-profile"
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <User size={18} /> My Profile
                        </Link>

                        {user.role === "admin" ? (
                          <Link
                            to="/admin-home"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-indigo-50 rounded-xl transition-all"
                          >
                            <MdAdminPanelSettings size={18} /> Admin Dashboard
                          </Link>
                        ) : user.role === "seller" ? (
                          <Link
                            to="/seller-dashboard"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-indigo-50 rounded-xl transition-all"
                          >
                            <MdDashboardCustomize size={18} />
                            Seller Dashboard
                          </Link>
                        ) : (
                          <Link
                            to="/my-bookings"
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-indigo-50 rounded-xl transition-all"
                          >
                            <Briefcase size={18} /> My Bookings
                          </Link>
                        )}

                        <hr className="my-2 border-slate-100" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <LogOut size={18} /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-slate-900 bg-slate-50 rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- NOTIFICATION SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">
                  Notifications
                </h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 flex-1 overflow-y-auto">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAsRead}
                    className="mb-4 text-xs font-bold text-indigo-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className={`p-4 rounded-2xl mb-3 border ${!n.read ? "bg-indigo-50 border-indigo-100" : "bg-white border-slate-100"}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-black uppercase text-indigo-600 tracking-tighter">
                          New Update
                        </span>
                        {!n.read && (
                          <Circle
                            size={8}
                            className="fill-indigo-600 text-indigo-600"
                          />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {n.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-40">
                    <Bell size={48} />
                    <p className="text-sm font-bold mt-2">
                      No notifications yet
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[73px] bg-white z-[30] md:hidden flex flex-col p-6 overflow-y-auto"
          >
            {token && user && (
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
                <img
                  src={
                    user.profilePicture ||
                    `https://ui-avatars.com/api/?name=${user.name}`
                  }
                  className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                  alt="Profile"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">
                    {user.name}
                  </h4>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl font-bold text-slate-800"
              >
                <div className="flex items-center gap-3">
                  <Home size={20} /> Home
                </div>
                <ChevronRight size={18} />
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl font-bold text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} /> {link.name}
                  </div>
                  <ChevronRight size={18} />
                </Link>
              ))}
            </div>

            <hr className="my-6 border-slate-100" />

            <div className="flex flex-col gap-3 mt-auto">
              {!token ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-4 bg-slate-100 text-slate-900 rounded-2xl font-bold"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100"
                  >
                    Get Started
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/my-bookings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-4 bg-slate-100 text-slate-900 rounded-2xl font-bold text-center"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-50 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <LogOut size={20} /> Sign Out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
