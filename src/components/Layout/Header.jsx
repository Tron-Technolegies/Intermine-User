import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { LuMail } from "react-icons/lu";

export default function Header() {
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/my-miners":
        return "My Miners";
      case "/total-history":
        return "Total History";
      case "/agreement":
        return "Agreement";
      default:
        return "Overview";
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotification(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-slate-200/50">
      <h1 className="text-xl font-semibold text-slate-800">{getPageTitle()}</h1>

      <div className="flex items-center gap-6">
        {/* Notification */}
        <div className="relative" ref={notificationRef}>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          <LuMail
            className="w-6 h-6 cursor-pointer"
            onClick={() => setShowNotification(!showNotification)}
          />

          {showNotification && (
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-3 border border-slate-200 z-50">
              <p className="text-sm text-slate-700 px-4 pb-2 font-medium">Notifications</p>
              <ul className="text-xs text-slate-600 px-4 space-y-2">
                <li className="border-b pb-2">No new notifications</li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile */}
        <div
          className="relative flex items-center gap-3 cursor-pointer"
          ref={profileRef}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <img src="/profile-img.png" alt="user" className="w-8 h-8 rounded-full" />
          <div className="text-right">
            <p className="text-sm font-medium">Jack Wilder</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-40 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
              <Link
                to="/profile-settings"
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Profile Settings
              </Link>
              <button
                onClick={() => alert("Logout Working")}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
