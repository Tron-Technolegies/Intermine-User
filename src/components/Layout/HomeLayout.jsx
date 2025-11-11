import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Sidebar (visible always on large screens, toggle below 1024px) */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 bg-slate-50 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay (only visible when sidebar is open on small screens) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40 transition-all duration-500"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
