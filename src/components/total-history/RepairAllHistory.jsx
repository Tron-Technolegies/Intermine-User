import React, { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { BsCheckCircle } from "react-icons/bs";

export default function RepairAllHistory() {
  const [filter, setFilter] = useState("All");

  const historyData = [
    {
      id: "#TKT-A1B2C3",
      miner: "Antminer S19 Pro",
      issue: "Overheating",
      description: "Temperature consistently above 70°C",
      reported: "08/12/2024",
      resolved: "09/12/2024",
      worker: "demo_user.worker001",
      pool: "slushpool.com:4444",
      purchased: "15/01/2025",
      poolChanged: "15/02/2025",
      status: "resolved",
    },
    {
      id: "#TKT-A1B2C4",
      miner: "Antminer S19 Pro",
      issue: "Overheating",
      description: "Temperature consistently above 70°C",
      reported: "08/12/2024",
      resolved: "-",
      worker: "demo_user.worker001",
      pool: "slushpool.com:4444",
      purchased: "15/01/2025",
      poolChanged: "15/02/2025",
      status: "in progress",
    },
    {
      id: "#TKT-A1B2C4",
      miner: "Antminer S19 Pro",
      issue: "Overheating",
      description: "Temperature consistently above 70°C",
      reported: "08/12/2024",
      resolved: "-",
      worker: "demo_user.worker001",
      pool: "slushpool.com:4444",
      purchased: "15/01/2025",
      poolChanged: "15/02/2025",
      status: "in progress",
    },
    {
      id: "#TKT-A1B2C4",
      miner: "Antminer S19 Pro",
      issue: "Overheating",
      description: "Temperature consistently above 70°C",
      reported: "08/12/2024",
      resolved: "-",
      worker: "demo_user.worker001",
      pool: "slushpool.com:4444",
      purchased: "15/01/2025",
      poolChanged: "15/02/2025",
      status: "in progress",
    },
    {
      id: "#TKT-A1B2C4",
      miner: "Antminer S19 Pro",
      issue: "Overheating",
      description: "Temperature consistently above 70°C",
      reported: "08/12/2024",
      resolved: "-",
      worker: "demo_user.worker001",
      pool: "slushpool.com:4444",
      purchased: "15/01/2025",
      poolChanged: "15/02/2025",
      status: "in progress",
    },
  ];

  // Filter logic
  const filteredData =
    filter === "All"
      ? historyData
      : historyData.filter((item) => item.status === filter.toLowerCase());

  return (
    <div className="bg-white p-6 rounded-lg ">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-semibold text-lg text-gray-800">Repair History</h2>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-[#F5F6F7] p-1 rounded-lg">
          {["All", "Resolved", "In Progress"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-1 rounded-md text-sm font-medium transition ${
                filter === item ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredData.map((data, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 bg-[#F9F9FA]">
            {/* Top Row */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <BsCheckCircle
                  className={`text-lg ${
                    data.status === "resolved" ? "text-green-500" : "text-yellow-500"
                  }`}
                />
                <p className="font-semibold text-gray-800 text-sm">{data.id}</p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  data.status === "resolved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {data.status}
              </span>
            </div>
            <div className="pt-2 border-t border-[#DADEE6]"></div>
            {/* Miner Info */}
            <div className="mb-2">
              <p className="font-semibold text-gray-800">{data.miner}</p>
              <p className="text-sm text-gray-600">
                {data.issue} — {data.description}
              </p>
            </div>

            {/* Dates */}
            <div className="flex items-center justify-between text-xs text-gray-500 mt-3 border-t border-gray-200 pt-2">
              <div className="flex items-center gap-1">
                <CiCalendar /> Reported: {data.reported}
              </div>
              {data.resolved && data.resolved !== "-" && (
                <div className="flex items-center gap-1">
                  <CiCalendar /> Resolved: {data.resolved}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No records found.</p>
      )}
    </div>
  );
}
