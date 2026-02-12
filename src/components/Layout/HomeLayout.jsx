import React, { useContext, useState, useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { UserContext } from "../../UserContext";
import Loading from "../Loading";
import FirstPopup from "./FirstPopup";
import FirstAgreementPopup from "./FirstAgreementPopup";

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [openWelcome, setOpenWelcome] = useState(false);
  const [openAgree, setOpenAgree] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const user = useLoaderData();

  const { isLoading, data, error, isSuccess } = useGetUserInfo();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      setUser(data);
      if (!data.allTermsAccepted) {
        setOpenWelcome(true);
      }
      if (
        (data.miningAgreement || data.purchaseAgreement) &&
        !data.isAgreementSigned
      ) {
        setOpenAgree(true);
      }
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen relative overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header onMenuToggle={toggleSidebar} />

        <main className="flex-1 bg-slate-50 overflow-y-auto p-6">
          <FirstAgreementPopup
            open={openAgree}
            handleClose={() => setOpenAgree(false)}
          />
          <FirstPopup
            open={openWelcome}
            handleClose={() => setOpenWelcome(false)}
          />
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
