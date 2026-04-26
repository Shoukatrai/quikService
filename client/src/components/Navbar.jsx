import React, { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut, Briefcase, Settings as SettingsIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { removeUser } from "../store/counterSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // IMPORTANT: Aapka user data state.user.user ke andar hai
  const { user } = useSelector((state) => state.user);
  const token = Cookies.get("token");

  // Outside click handle karne ke liye
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(removeUser());
    setShowProfileMenu(false);
    navigate("/login");
  };

  const navLinks = [
    { name: "Find Services", href: "/" },
    { name: "Become a Provider", href: "/become-seller" },
    { name: "How it Works", href: "#" },
  ];

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-200">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Quick<span className="text-indigo-600">Service</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) => 
                `transition-colors font-semibold text-sm ${isActive ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {token && user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 pr-3 bg-slate-50 border border-slate-200 rounded-full hover:shadow-md transition-all active:scale-95"
              >
                <img
                  src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                  className="w-8 h-8 rounded-full object-cover border border-white shadow-sm"
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
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Logged in as</p>
                        <p className="text-xs font-bold text-slate-700 truncate">{user.email}</p>
                    </div>
                    
                    <Link to="/my-profile" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                      <User size={18} /> My Profile
                    </Link>
                    
                    <Link to="/my_bookings" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                      <Briefcase size={18} /> My Bookings
                    </Link>

                    {user.role === "seller" && (
                      <Link to="/seller-dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
                        <SettingsIcon size={18} /> Seller Dashboard
                      </Link>
                    )}

                    <hr className="my-2 border-slate-100" />
                    
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all">
                      <LogOut size={18} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-100 active:scale-95"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 overflow-hidden md:hidden shadow-xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {token && user && (
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-2">
                  <img
                    src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}`}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    alt="Profile"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{user.name}</h4>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-slate-800 hover:text-indigo-600 px-3"
                >
                  {link.name}
                </Link>
              ))}

              <hr className="border-slate-100" />

              {!token ? (
                <div className="flex flex-col gap-3">
                  <button className="w-full py-4 bg-slate-100 text-slate-900 rounded-2xl font-bold" onClick={() => { navigate("/login"); setIsOpen(false); }}>
                    Sign In
                  </button>
                  <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold" onClick={() => { navigate("/signup"); setIsOpen(false); }}>
                    Get Started
                  </button>
                </div>
              ) : (
                <button className="w-full py-4 bg-red-50 text-red-500 rounded-2xl font-bold flex items-center justify-center gap-2" onClick={handleLogout}>
                  <LogOut size={20} /> Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;