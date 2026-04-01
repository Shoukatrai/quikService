import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const SellerDashboardLayout = ({ children, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        role={user?.role}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          user={user}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboardLayout;
