import React from "react";
import { FiCpu, FiTool, FiZap, FiActivity } from "react-icons/fi";
import StatCard from "../../components/dashboard/StatCard";
import IssueCard from "../../components/dashboard/IssueCard";
import MinerCard from "../../components/myminers/MinerCard";
import { Link } from "react-router-dom";

import useUserStats from "../../hooks/useUserStats";
import useClientMiners from "../../hooks/useClientMiners";
import useUserIssues from "../../hooks/issues/useUserIssues";
import Loading from "../../components/Loading";

export default function Dashboard() {
  const { data: statsData, isLoading: statsLoading } = useUserStats();
  const { data: miners = [], isLoading: minersLoading } = useClientMiners();
  const { data, isLoading: issuesLoading } = useUserIssues("ALL");
  const issues = data?.issues || [];

  if (statsLoading || minersLoading || issuesLoading) {
    return <Loading />;
  }

  const stats = [
    {
      title: "Total Miners",
      value: statsData?.totalMiners ?? 0,
      icon: <FiCpu size={20} />,
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
    },
    {
      title: "Total Repairs",
      value: statsData?.repairs ?? 0,
      icon: <FiTool size={20} />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      title: "Hash rate",
      value: `${statsData?.totalHashRate ?? 0} TH/s`,
      icon: <FiActivity size={20} />,
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      hashDetails: {
        total: statsData.totalHashRate,
        active: statsData.onlineHash,
        inactive: statsData.offlineHash,
      },
    },
    {
      title: "Power Consumption",
      value: `${statsData?.totalPower ?? 0} KW`,
      icon: <FiZap size={20} />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      powerDetails: {
        total: statsData.totalPower,
        active: statsData.onlinePower,
        inactive: statsData.offlinePower,
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((item, i) => (
          <StatCard key={i} {...item} />
        ))}
      </div>

      {/* MINERS + ISSUES */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Miners Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 w-full xl:w-2/3">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Your Miners</h2>
            <Link to="/my-miners" className="text-sm text-indigo-600">
              View all
            </Link>
          </div>

          {/* Miners Section */}
          {miners.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {miners.slice(0, 2).map((miner, i) => (
                <MinerCard key={i} miner={miner} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-400 text-sm py-6">No miners available.</p>
          )}
        </div>

        {/* Issues Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 w-full xl:w-1/3">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Issue History</h2>
            <Link to="/total-history" className="text-sm text-indigo-600">
              View all
            </Link>
          </div>

          {/* Issues Section */}
          {issues.length ? (
            <div className="grid gap-4">
              {issues.slice(0, 4).map((issue, i) => (
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
