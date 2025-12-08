import React, { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { BsCheckCircle } from "react-icons/bs";
import { LuMessagesSquare } from "react-icons/lu";
import useUserIssues from "../../hooks/issues/useUserIssues";
import IssueMessagesModal from "./IssueMessagesModal";
import { MdOutlineChat } from "react-icons/md";

export default function RepairAllHistory() {
  const [filter, setFilter] = useState("ALL");
  const [selectedIssue, setSelectedIssue] = useState(null);

  const { data, isLoading } = useUserIssues(filter);
  const issues = data?.issues || [];

  if (isLoading) return <p className="text-gray-500 text-sm">Loading...</p>;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <h2 className="font-semibold text-lg sm:text-xl text-gray-800">
          Repair History
        </h2>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 sm:gap-2 bg-[#F5F6F7] p-1 rounded-lg overflow-x-auto scrollbar-hide">
          {["ALL", "Resolved", "Pending"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-3 sm:px-4 py-1 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                filter === item
                  ? "bg-white shadow-sm text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {issues.map((item, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 bg-[#F9F9FA] hover:shadow-md transition"
          >
            {/* Header row */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <BsCheckCircle
                  className={`text-lg ${
                    item.status.toLowerCase() === "resolved"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                />
                <p className="font-semibold text-gray-800 text-sm sm:text-base">
                  #{item._id.slice(-6)}
                </p>
              </div>

              <span
                className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium ${
                  item.status.toLowerCase() === "resolved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="pt-2 border-t border-[#DADEE6]" />

            {/* Miner Info */}
            <div className="mt-2">
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {item.type === "change" ? "Pool/Worker Change" : "Repair Issue"}
              </p>
              <p>{item?.miner?.model}</p>
              <p className="text-xs sm:text-sm text-gray-600">
                {item.type === "change"
                  ? `Worker: ${item.changeRequest?.worker}, Pool: ${item.changeRequest?.pool}`
                  : item.issue?.issueType || "No description"}
              </p>
              {item.type !== "change" && item.description && (
                <p className="text-xs sm:text-sm text-gray-600">
                  {item.description}
                </p>
              )}
            </div>

            {/* Dates + Message Icon */}
            <div className="flex justify-between items-center text-[11px] sm:text-xs text-gray-500 mt-3 border-t border-gray-200 pt-2">
              <div className="flex items-center gap-1">
                <CiCalendar className="text-gray-400" />{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </div>

              {item.messages?.length > 0 && (
                <button
                  onClick={() => setSelectedIssue(item._id)}
                  className="text-gray-300 hover:text-gray-600 transition"
                >
                  <MdOutlineChat size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && issues.length === 0 && (
        <p className="text-center text-gray-500 mt-10 text-sm sm:text-base">
          No history found.
        </p>
      )}

      {/* Messages Modal */}
      {selectedIssue && (
        <IssueMessagesModal
          issueId={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </div>
  );
}
