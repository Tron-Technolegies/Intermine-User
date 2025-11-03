import React from "react";
import MinerCard from "../../components/myminers/MinerCard";

const miners = [
  {
    name: "Antminer S19 Pro",
    serial: "ASI9P-240001",
    status: "Online",
    hashrate: "110 TH/s",
    power: "3250W",
    warranty: "129 days remaining",
    worker: "demo_user.worker001",
    pool: "slushpool.com:4444",
    purchased: "15/01/2025",
  },
  {
    name: "Antminer S19 Pro",
    serial: "ASI9P-240002",
    status: "Repair",
    hashrate: "95 TH/s",
    power: "3100W",
    warranty: "80 days remaining",
    worker: "demo_user.worker002",
    pool: "btcminerpool.com:3333",
    purchased: "12/01/2025",
  },
  {
    name: "Antminer S19 Pro",
    serial: "ASI9P-240002",
    status: "Repair",
    hashrate: "95 TH/s",
    power: "3100W",
    warranty: "80 days remaining",
    worker: "demo_user.worker002",
    pool: "btcminerpool.com:3333",
    purchased: "12/01/2025",
  },
];

export default function MyMiners() {
  return (
    <section className="p-6 min-h-screen bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-800">Your Miners</h2>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6  ">
        {miners.map((miner, i) => (
          <MinerCard key={i} miner={miner} />
        ))}
      </div>
    </section>
  );
}
