import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  AlertTriangle,
  CreditCard,
  Settings,
  BarChart3,
  LogOut,
  X,
  Layers,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminMenu = [
    { icon: <LayoutDashboard size={20} />, label: "Overview", path: "/admin/dashboard" },
    { icon: <Users size={20} />, label: "User Management", path: "/admin/users" },
    { icon: <Layers size={20} />, label: "Service Categories", path: "/admin/categories" },
    { icon: <ShieldCheck size={20} />, label: "Verifications", path: "/verify-sellers", badge: "12" }, // Pending count
    { icon: <AlertTriangle size={20} />, label: "Disputes", path: "/admin/disputes", color: "text-rose-400" },
    { icon: <CreditCard size={20} />, label: "Payouts & Tax", path: "/admin/payouts" },
    { icon: <BarChart3 size={20} />, label: "Platform Analytics", path: "/admin/analytics" },
    { icon: <Settings size={20} />, label: "System Settings", path: "/admin/settings" },
  ];

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0F172A] text-slate-400 transform transition-transform duration-300 ease-in-out border-r border-white/5 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          
          {/* Admin Branding */}
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-600/20">
                <ShieldCheck className="text-white" size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white leading-none tracking-tight">Admin<span className="text-rose-500">Hub</span></span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[2px] mt-1">Control Panel</span>
              </div>
            </div>
            <button className="lg:hidden text-slate-400" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            <div className="px-4 mb-4 mt-2">
              <p className="text-[10px] font-black uppercase tracking-[3px] text-slate-600">Platform Management</p>
            </div>

            {adminMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group relative ${
                    isActive 
                      ? "bg-white/5 text-white shadow-inner" 
                      : "hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3 z-10">
                    <span className={`${isActive ? "text-rose-500" : item.color || "text-slate-500 group-hover:text-slate-300"}`}>
                      {item.icon}
                    </span>
                    <span className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}>{item.label}</span>
                  </div>

                  {/* Badge for Notifications */}
                  {item.badge && (
                    <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-lg group-hover:scale-110 transition-transform">
                      {item.badge}
                    </span>
                  )}

                  {/* Active Slide Indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="adminNav"
                      className="absolute inset-0 bg-rose-500/5 border-r-4 border-rose-500 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* System Info & Logout */}
          <div className="p-6 border-t border-white/5">
            <div className="bg-slate-800/40 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">System Status: Stable</p>
              </div>
              <p className="text-[10px] text-slate-500">v2.4.0-production</p>
            </div>

            <button
              className="flex items-center gap-3 px-4 py-3.5 w-full text-slate-400 hover:text-rose-400 hover:bg-rose-400/5 rounded-xl transition-all font-bold text-sm"
              onClick={logout}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;