import React, { useState } from "react";
import useRequestPoolChange from "../../hooks/miners/useRequestPoolChange";

export default function RequestChangeModal({ onClose, miner }) {
  const [worker, setWorker] = useState(miner.workerId);
  const [pool, setPool] = useState(miner.poolAddress);

  const requestChange = useRequestPoolChange();

  const handleSubmit = () => {
    requestChange.mutate(
      {
        miner: miner._id,
        worker,
        pool,
        workerAddress: miner.workerId,
      },
      { onSuccess: onClose }
    );
  };

  return (
    <div className="bg-white rounded-xl w-96 p-5">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Request Changes</h2>
        <button onClick={onClose} className="text-gray-500">
          ✕
        </button>
      </div>

      <label className="text-sm font-medium">Worker Name</label>
      <input
        className="w-full border px-3 py-2 rounded-lg mb-3"
        value={worker}
        onChange={(e) => setWorker(e.target.value)}
      />

      <label className="text-sm font-medium">Pool Address</label>
      <input
        className="w-full border px-3 py-2 rounded-lg mb-5"
        value={pool}
        onChange={(e) => setPool(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Request Changes
      </button>
    </div>
  );
}
