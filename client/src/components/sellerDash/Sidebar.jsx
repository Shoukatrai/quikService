import {
  LayoutDashboard,
  Briefcase,
  Wallet,
  Settings,
  ShieldCheck,
  X,
  ClipboardList,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom"; 

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation(); 

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Overview",
      path: "/seller-dashboard",
    },
    { icon: <Briefcase size={20} />, label: "My Gigs", path: "/seller-gigs" },
    {
      icon: <ClipboardList size={20} />,
      label: "My Jobs",
      path: "/seller-jobs",
    },
    { icon: <Wallet size={20} />, label: "Earnings", path: "/seller-earnings" },
    {
      icon: <ShieldCheck size={20} />,
      label: "Verification",
      path: "/seller-verify",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/seller-setting",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 border-r border-white/5`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-6 flex items-center justify-between">
            <span className="text-xl font-bold text-white tracking-tight">
              Quick<span className="text-indigo-400">Service</span>
            </span>
            <button
              className="md:hidden text-slate-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* 2. Seller Dashboard Badge (Logo ke niche) */}
          <div className="px-6 py-2 mb-4">
            <div className="flex items-center gap-3 p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 shadow-sm">
              <div className="overflow-hidden">
                <h4 className="text-[10px] font-black uppercase tracking-[2px] text-indigo-400 leading-none">
                  Seller
                </h4>
                <p className="text-sm font-bold text-white tracking-wider mt-1.5 leading-none">
                  DASHBOARD
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => window.innerWidth < 768 && setIsOpen(false)} // Mobile par link click hote hi close ho jaye
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "hover:bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  <span
                    className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-indigo-400"}`}
                  >
                    {item.icon}
                  </span>
                  <span className="font-semibold text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Footer (Optional small text) */}
          <div className="p-6 text-center">
            <p className="text-[10px] text-slate-600 font-medium tracking-widest uppercase">
              © 2026 QuickService v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
