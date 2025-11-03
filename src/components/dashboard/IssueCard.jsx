import React from "react";
import { CiCalendar } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
export default function IssueCard({ issue }) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-1">
        <p className="font-semibold text-slate-800 text-sm">#{issue.ticketId}</p>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            issue.status === "resolved"
              ? "bg-green-100 text-green-700"
              : issue.status === "in progress"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {issue.status}
        </span>
      </div>
      <p className="text-sm font-medium text-slate-700">{issue.miner}</p>
      <p className="text-xs text-slate-500 mt-1">{issue.description}</p>
      <div className="mt-3 flex justify-between text-xs text-slate-400">
        <p className="flex items-center gap-1">
          <CiCalendar /> Reported: {issue.reported}
        </p>
        <p className="flex items-center gap-1">
          <IoIosCheckmarkCircleOutline /> Resolved: {issue.resolved}
        </p>
      </div>
    </div>
  );
}
