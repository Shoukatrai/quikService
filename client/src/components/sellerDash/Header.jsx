import { Bell, Search, Menu, CheckCircle, Clock } from "lucide-react";

const Header = ({ toggleSidebar, user }) => {
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
          className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${user?.isVerified ? "bg-green-50 text-green-700 border border-green-100" : "bg-amber-50 text-amber-700 border border-amber-100"}`}
        >
          {user?.isVerified ? <CheckCircle size={14} /> : <Clock size={14} />}
          {user?.isVerified ? "Verified Pro" : "Pending Approval"}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Search - Hidden on tiny screens */}
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search jobs..."
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-64"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none">
              {user?.name || "Seller Name"}
            </p>
            <p className="text-xs text-slate-500 mt-1 capitalize">
              {user?.role}
            </p>
          </div>
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
            {user?.name?.charAt(0) || "S"}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
