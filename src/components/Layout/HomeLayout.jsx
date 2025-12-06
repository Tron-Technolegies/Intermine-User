import React, { useContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { UserContext } from "../../UserContext";

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const { isLoading, data, error, isSuccess } = useGetUserInfo();

  // Redirect when API returns error
  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (error && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [error, navigate, location.pathname]);

  // Store user + validate role
  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);

      // If user is NOT "Client", redirect to login
      if (data.role !== "Client") {
        navigate("/login");
      }
    }
  }, [isSuccess, data, navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40 transition-all duration-500"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
