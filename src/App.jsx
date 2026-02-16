import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import HomeLayout from "./components/Layout/HomeLayout";
import ErrorPage from "./pages/error/ErrorPage";
import Dashboard from "./pages/DashboardPage/Dashboard";
import MyMiner from "./pages/MinerPage/MyMiner";
import TotalHistory from "./pages/Total-History/TotalHistory";
import Agreement from "./pages/Agreement/Agreement";
import Login from "./components/Login/Login";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";

import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

import { ToastContainer } from "react-toastify";
import { adminLoader } from "./loader/adminLoader";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/verify-otp", element: <VerifyOtpPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },

  // PROTECTED LAYOUT ROUTES
  {
    path: "/",
    element: <HomeLayout />,
    loader: adminLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "my-miners", element: <MyMiner /> },
      { path: "total-history", element: <TotalHistory /> },
      { path: "agreement", element: <Agreement /> },
      { path: "profile-settings", element: <ProfileSettings /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
      <RouterProvider router={router} />
    </>
  );
}
