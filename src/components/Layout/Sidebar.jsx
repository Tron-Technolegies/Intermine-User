import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiGrid, FiCpu, FiClock, FiFileText } from "react-icons/fi";
import { PiChartPieSliceFill } from "react-icons/pi";
import { RiHistoryFill } from "react-icons/ri";

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="bg-white h-screen border-r border-slate-200 flex flex-col transition-all duration-300 w-20 md:w-64">
      {/* Logo */}
      <div className="p-4 border-b border-slate-200 flex justify-center md:justify-start">
        <img src="/sidebar-logo.png" alt="intermine-logo" className="w-10 md:w-full md:block" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 md:p-4 space-y-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition text-sm ${
              isActive || location.pathname === "/"
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <PiChartPieSliceFill className="w-6 h-6" />
          <span className="hidden md:inline">Overview</span>
        </NavLink>

        <NavLink
          to="/my-miners"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition text-sm ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <FiCpu className="w-6 h-6" />
          <span className="hidden md:inline">My Miners</span>
        </NavLink>

        <NavLink
          to="/total-history"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition text-sm ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <RiHistoryFill className="w-6 h-6" />
          <span className="hidden md:inline">Total History</span>
        </NavLink>

        <NavLink
          to="/agreement"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md font-medium transition text-sm ${
              isActive
                ? "bg-[#2B347A] text-white"
                : "text-black hover:bg-[#2B347A] hover:text-white"
            }`
          }
        >
          <FiFileText className="w-6 h-6" />
          <span className="hidden md:inline">Agreement</span>
        </NavLink>
      </nav>
    </div>
  );
}
