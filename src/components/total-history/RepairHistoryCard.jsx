import React, { useEffect, useState } from "react";
import useIssueStats from "../../hooks/issues/useIssueStats";

export default function RepairHistoryCard() {
  const { data, isLoading } = useIssueStats();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (data) {
      const states = [
        { label: "Total Issues", value: data?.allIssues || 0 },
        { label: "Completed", value: data?.resolved || 0 },
        { label: "In Progress", value: data?.pending || 0 },
        { label: "Warranty Issues", value: data?.warranty || 0 },
        { label: "Repair Issues", value: data?.repair || 0 },
      ];
      setStats(states);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
      <h1 className="font-semibold text-lg sm:text-xl text-black">
        Repair Status
      </h1>
      <p className="text-[#545659] text-sm sm:text-base mt-1">
        Complete maintenance and repair records for all your mining equipments
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-5 p-3 sm:p-4">
        {stats.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-[#F7F8F9] p-2 sm:p-3 border border-[#EEF1F4] rounded-lg hover:bg-[#EEF1F4] transition"
            >
              <p className="text-gray-700 font-medium text-xs sm:text-sm text-center">
                {item.label}
              </p>
              <p className="text-base sm:text-lg font-semibold text-gray-600 mt-1">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
