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
    <div className="p-5 bg-white rounded-lg ">
      <h1 className="font-semibold text-lg text-black">Repair Status</h1>
      <p className="text-[#545659] text-sm">
        Complete maintenance and repair records for all your mining equipments
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-5 p-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-[#F7F8F9] p-2 border border-[#EEF1F4] hover:bg-[#EEF1F4] transition"
          >
            <p className="text-gray-700 font-medium text-sm">{item.label}</p>
            <p className="text-lg font-semibold text-gray-600">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
