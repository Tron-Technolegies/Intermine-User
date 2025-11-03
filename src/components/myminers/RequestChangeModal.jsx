import React from "react";

export default function RequestChangeModal({ onClose }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-96 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Request Changes</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <label className="block mb-2 text-sm font-medium">Worker Name</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 mb-3"
          defaultValue="demo_user.worker001"
        />

        <label className="block mb-2 text-sm font-medium">Pool Address</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 mb-5"
          defaultValue="slushpool.com:4444"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
          Request Changes
        </button>
      </div>
    </div>
  );
}
