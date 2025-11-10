import React from "react";
import { FiCpu, FiTool, FiZap, FiActivity } from "react-icons/fi";
import StatCard from "../../components/dashboard/StatCard";
import IssueCard from "../../components/dashboard/IssueCard";
import MinerCard from "../../components/myminers/MinerCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Miners",
      value: 12,
      icon: <FiCpu size={20} />,
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
    },
    {
      title: "Total Repairs",
      value: 15,
      icon: <FiTool size={20} />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      title: "Hash rate",
      value: "84.2 TH/s",
      icon: <FiActivity size={20} />,
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Power Consumption",
      value: "22.2 KW",
      icon: <FiZap size={20} />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
    },
  ];

  const miners = [
    {
      name: "Antminer S19 Pro",
      serial: "AS19P-240001",
      hashrate: "110 TH/s",
      power: "3250W",
      warranty: "129 days remaining",
      status: "Online",
      worker: "demo_user.worker001",
      pool: "slushpool.com:4444",
      purchased: "15/01/2025",
    },
    {
      name: "Antminer S19 Pro",
      serial: "AS19P-240002",
      hashrate: "110 TH/s",
      power: "3250W",
      warranty: "129 days remaining",
      status: "Online",
      worker: "demo_user.worker002",
      pool: "slushpool.com:4444",
      purchased: "15/01/2025",
    },
  ];

  const issues = [
    {
      ticketId: "TKT-A1B2C3",
      miner: "Antminer S19 Pro",
      description: "Overheating - Temperature consistently above 70°C",
      status: "resolved",
      reported: "08/12/2024",
      resolved: "09/12/2024",
    },
    {
      ticketId: "TKT-A1B2D3",
      miner: "Antminer S19 Pro",
      description: "Overheating - Temperature consistently above 70°C",
      status: "in progress",
      reported: "08/12/2024",
      resolved: "09/12/2024",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item, i) => (
          <StatCard key={i} {...item} />
        ))}
      </div>

      {/* Miners & Issues */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Miners Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 w-full xl:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Your Miners</h2>
            <Link to={"/my-miners"} className="text-sm text-indigo-600 cursor-pointer">
              View all
            </Link>
          </div>

          {miners.length ? (
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              {miners.map((miner, i) => (
                <div key={i} className="w-full sm:w-[calc(50%-0.5rem)]">
                  <MinerCard miner={miner} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-400 text-sm py-6">No miners available.</p>
          )}
        </div>

        {/* Issues Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 w-full xl:w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Issue History</h2>
            <Link to={"/total-history"} className="text-sm text-indigo-600 cursor-pointer">
              View all
            </Link>
          </div>

          {issues.length ? (
            <div className="grid gap-4">
              {issues.map((issue, i) => (
                <IssueCard key={i} issue={issue} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-400 text-sm py-6">No issues to show.</p>
          )}
        </div>
      </div>
    </div>
  );
}
