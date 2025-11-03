import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import HomeLayout from "./components/Layout/HomeLayout";
import ErrorPage from "./pages/error/ErrorPage";
import Dashboard from "./pages/DashboardPage/Dashboard";
import MyMiner from "./pages/MinerPage/MyMiner";
import TotalHistory from "./pages/Total-History/TotalHistory";
import Agreement from "./pages/Agreement/Agreement";
import Login from "./components/Login/Login";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />

      <Route path="/" element={<HomeLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-miners" element={<MyMiner />} />
        <Route path="total-history" element={<TotalHistory />} />
        <Route path="agreement" element={<Agreement />} />
        <Route path="profile-settings" element={<ProfileSettings />} />
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
