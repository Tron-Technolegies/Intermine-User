import React, { useState, useRef, useEffect, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { LuMail } from "react-icons/lu";
import { IoChevronDown } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { UserContext } from "../../UserContext";
import api from "../../api/api";
import { useNotificationContext } from "../../NotificationContext";

export default function Header({ onMenuToggle }) {
  const {
    data: notifications = [],
    isLoading,
    clearOne,
    clearAll,
  } = useNotificationContext();

  const unreadCount = notifications.length;

  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [showNotification, setShowNotification] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Logout
  const handleLogout = async () => {
    await api.post("auth/logout", {}, { withCredentials: true });
    setUser(null);
    navigate("/login");
  };

  // Page Title
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
        return "Profile Settings";
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotification(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-slate-200">
      <div className="flex items-center gap-4">
        <button className="block lg:hidden" onClick={onMenuToggle}>
          <RxHamburgerMenu className="w-6 h-6 text-slate-700" />
        </button>
        <h1 className="text-xl font-semibold text-slate-800">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        {/* Notification */}
        <div className="relative" ref={notificationRef}>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          )}

          <LuMail
            className="w-7 h-7 cursor-pointer text-slate-700"
            onClick={() => setShowNotification(!showNotification)}
          />

          {showNotification && (
            <div className="absolute right-0 mt-3 w-96 bg-white shadow-xl rounded-xl border border-slate-200 z-50">
              {/* HEADER */}
              <div className="flex justify-between items-center px-4 py-3 border-b bg-slate-50 rounded-t-xl">
                <p className="text-sm font-semibold text-slate-800">
                  Notifications
                </p>

                {unreadCount > 0 && (
                  <button
                    onClick={() => clearAll.mutate()}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* LIST */}
              <ul className="max-h-72 overflow-y-auto px-4 py-3 space-y-3 custom-scroll">
                {isLoading ? (
                  <p className="text-center text-sm text-slate-500 py-3">
                    Loading notifications...
                  </p>
                ) : notifications.length === 0 ? (
                  <p className="text-center text-sm text-slate-500 py-3">
                    No new notifications
                  </p>
                ) : (
                  notifications.map((item) => (
                    <li
                      key={item?._id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 shadow-sm hover:bg-slate-100 transition"
                    >
                      {/* TITLE + CLEAR ONE */}
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-slate-800">
                          {item?.problem || "Notification"}
                        </p>

                        <button
                          onClick={() => clearOne.mutate(item._id)}
                          className="text-[11px] text-red-500 hover:text-red-700"
                        >
                          Clear
                        </button>
                      </div>

                      {/* MESSAGE CONTENT */}

                      {/* DATE */}
                      <p className="text-[10px] text-slate-400 mt-2">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div
          className="relative flex items-center gap-3 cursor-pointer"
          ref={profileRef}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex justify-center items-center font-semibold">
            {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-slate-500">{user?.role}</p>
          </div>

          <IoChevronDown
            className={`w-4 h-4 text-slate-500 transition-transform ${
              showProfileMenu ? "rotate-180" : ""
            }`}
          />

          {/* Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
              <Link
                to="/profile-settings"
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Profile Settings
              </Link>

              <button
                onClick={handleLogout}
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
