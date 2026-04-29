import { Bell, Search, Menu, CheckCircle, Clock, LogOut, User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ toggleSidebar, user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  // Bahar click karne par menu close karne ka logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <Menu size={24} />
        </button>

        {/* Verification Status Pill */}
        <div
          className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
            user?.seller?.isVerified 
              ? "bg-green-50 text-green-700 border border-green-100" 
              : "bg-amber-50 text-amber-700 border border-amber-100"
          }`}
        >
          {user?.seller?.isVerified ? <CheckCircle size={14} /> : <Clock size={14} />}
          {user?.seller?.isVerified ? "Verified Pro" : "Pending Approval"}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {/* --- User Profile Dropdown Container --- */}
        <div className="relative" ref={menuRef}>
          <div 
            className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group"
            onClick={() => setShowMenu(!showMenu)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">
                {user?.name || "Seller Name"}
              </p>
              <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">
                {user?.role}
              </p>
            </div>
            
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm overflow-hidden transition-transform group-hover:scale-105">
              {user?.seller?.profilePicture ? (
                <img
                  src={user?.seller?.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.name?.charAt(0) || "S"
              )}
            </div>
            <ChevronDown size={14} className={`text-slate-400 transition-transform ${showMenu ? "rotate-180" : ""}`} />
          </div>

          {/* Dropdown Menu Overlay */}
          {showMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-slate-50 md:hidden">
                <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role}</p>
              </div>
              
              {/* Option 1: View Profile */}
              <button 
                onClick={() => { setShowMenu(false); navigate("/seller-setting"); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <User size={16} />
                <span>My Profile</span>
              </button>

              <hr className="my-1 border-slate-50" />

              {/* Option 2: Logout */}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-semibold"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;