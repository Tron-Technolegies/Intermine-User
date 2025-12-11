import React, { useContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { UserContext } from "../../UserContext";
import Loading from "../Loading";

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const { isLoading, data, error, isSuccess } = useGetUserInfo();

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

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);

      if (data.role !== "Client") {
        navigate("/login");
      }
    }
  }, [isSuccess, data, navigate, setUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen relative overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 bg-slate-50 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40 transition-all duration-500"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
