import React from "react";
import MinerCard from "../../components/myminers/MinerCard";
import useClientMiners from "../../hooks/useClientMiners";

export default function MyMiners() {
  const { data: miners = [], isLoading, isError } = useClientMiners();

  if (isLoading) return <p className="p-5">Loading miners...</p>;
  if (isError) return <p className="p-5 text-red-500">No miners Found</p>;
  return (
    <section className="p-4 sm:p-6 min-h-screen bg-white rounded-lg">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h2 className="font-semibold text-lg text-gray-800">Your Miners</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {miners.map((miner, i) => (
          <MinerCard key={miner._id} miner={miner} />
        ))}
      </div>
    </section>
  );
}
