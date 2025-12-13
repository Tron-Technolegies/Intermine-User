import React from "react";

export default function HistoryModal({ onClose, miner }) {
  const history = [
    ...(miner?.issueHistory || []),
    ...(miner?.changeHistory || []),
  ];

  return (
    <div className="bg-white rounded-xl w-96 max-h-[400px] overflow-y-auto p-5">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Miner History</h2>
        <button onClick={onClose} className="text-gray-500">
          ✕
        </button>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-500 text-center">No history available</p>
      ) : (
        history.map((item, i) => (
          <div key={i} className="border p-3 rounded-lg mb-3">
            <div className="flex justify-between">
              <h3 className="font-medium capitalize">{item.type || "Event"}</h3>
              <p className={`text-xs`}>{item.status}</p>
            </div>
            {item.type === "repair" && (
              <p className="text-sm text-gray-600">
                {item.issue.issueType || ""}
              </p>
            )}
            {item.type === "change" && (
              <p className="text-sm text-gray-600 flex flex-col gap-1">
                <span>Req-Pool : {item.changeRequest.pool}</span>
                <span>Req-Worker : {item.changeRequest.worker}</span>
              </p>
            )}
            <p className="text-sm text-gray-600">{item.description || ""}</p>
            <p className="text-xs text-gray-400 mt-1">
              {item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
