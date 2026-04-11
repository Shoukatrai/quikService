import {
  LayoutDashboard,
  Briefcase,
  Wallet,
  Settings,
  ShieldCheck,
  LogOut,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, role }) => {
  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Overview",
      path: "/seller-dashboard",
    },
    { icon: <Briefcase size={20} />, label: "My Jobs", path: "/seller-jobs" },
    { icon: <Wallet size={20} />, label: "Earnings", path: "/seller-earnings" },
    { icon: <ShieldCheck size={20} />, label: "Verification", path: "/seller-verify" },
    { icon: <Settings size={20} />, label: "Settings", path: "/seller-setting" },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/50 z-40 md:hidden transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <span className="text-xl font-bold text-white tracking-tight">
              Quick<span className="text-indigo-400">Service</span>
            </span>
            <button
              className="md:hidden text-slate-400"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 mt-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 hover:text-white transition-all group"
              >
                <span className="text-slate-400 group-hover:text-indigo-400">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
