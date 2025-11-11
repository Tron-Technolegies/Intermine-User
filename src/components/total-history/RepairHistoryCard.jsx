import React from "react";

export default function RepairHistoryCard() {
  const history = {
    totalrepair: 5,
    completed: 3,
    inprogress: 1,
    warranty: 2,
    repair: 1,
  };

  const stats = [
    { label: "Total Repair", value: history.totalrepair },
    { label: "Completed", value: history.completed },
    { label: "In Progress", value: history.inprogress },
    { label: "Warranty", value: history.warranty },
    { label: "Repair", value: history.repair },
  ];

  return (
    <div className="p-4 sm:p-5 bg-white rounded-lg shadow-sm">
      <h1 className="font-semibold text-lg sm:text-xl text-black">Repair Status</h1>
      <p className="text-[#545659] text-sm sm:text-base mt-1">
        Complete maintenance and repair records for all your mining equipments
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-5 p-3 sm:p-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-[#F7F8F9] p-2 sm:p-3 border border-[#EEF1F4] rounded-lg hover:bg-[#EEF1F4] transition"
          >
            <p className="text-gray-700 font-medium text-xs sm:text-sm text-center">{item.label}</p>
            <p className="text-base sm:text-lg font-semibold text-gray-600 mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
