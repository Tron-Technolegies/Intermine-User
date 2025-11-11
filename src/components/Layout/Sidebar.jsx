import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiCpu, FiFileText } from "react-icons/fi";
import { PiChartPieSliceFill } from "react-icons/pi";
import { RiHistoryFill } from "react-icons/ri";

export default function Sidebar({ isOpen }) {
  const location = useLocation();

  return (
    <div
      className={`fixed lg:static top-0 left-0 h-screen bg-white border-r border-slate-200 flex flex-col transform transition-all duration-500 ease-in-out z-50
      ${isOpen ? "translate-x-0 w-64 shadow-2xl" : "-translate-x-full w-64 lg:translate-x-0"}
      lg:w-64`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-start gap-2">
        <img src="/sidebar-logo.png" alt="intermine-logo" className="items-center p-2 w-full" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3">
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
          <span>Overview</span>
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
          <span>My Miners</span>
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
          <span>Total History</span>
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
          <span>Agreement</span>
        </NavLink>
      </nav>
    </div>
  );
}
