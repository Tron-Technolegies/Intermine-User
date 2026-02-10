import React from "react";
import RepairHistoryCard from "../../components/total-history/RepairHistoryCard";
import RepairAllHistory from "../../components/total-history/RepairAllHistory";

export default function TotalHistory() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* <RepairHistoryCard /> */}
      <RepairAllHistory />
    </div>
  );
}
