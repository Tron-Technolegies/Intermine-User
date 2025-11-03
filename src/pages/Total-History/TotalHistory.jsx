import React from "react";
import RepairHistoryCard from "../../components/total-history/RepairHistoryCard";
import RepairAllHistory from "../../components/total-history/RepairAllHistory";

export default function TotalHistory() {
  return (
    <div className=" ">
      <RepairHistoryCard />
      <div className="mt-6">
        <RepairAllHistory />
      </div>
    </div>
  );
}
