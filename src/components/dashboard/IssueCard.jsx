import React from "react";
import { CiCalendar } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function IssueCard({ issue }) {
  const isChange = issue.type === "change";

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-1">
        <p className="font-semibold text-slate-800 text-sm">#{issue._id.slice(-6)}</p>

        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            issue.status.toLowerCase() === "resolved"
              ? "bg-green-100 text-green-700"
              : issue.status.toLowerCase() === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {issue.status}
        </span>
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-slate-700">
        {isChange ? "Pool / Worker Change" : "Repair Request"}
      </p>

      {/* Description */}
      <p className="text-xs text-slate-500 mt-1">
        {isChange
          ? `Worker: ${issue.changeRequest?.worker}, Pool: ${issue.changeRequest?.pool}`
          : issue.description}
      </p>

      {/* Dates */}
      <div className="mt-3 flex justify-between text-xs text-slate-400">
        <p className="flex items-center gap-1">
          <CiCalendar /> Reported: {new Date(issue.createdAt).toLocaleDateString()}
        </p>

        <p className="flex items-center gap-1">
          <IoIosCheckmarkCircleOutline /> Resolved:
        </p>
      </div>
    </div>
  );
}
