import React from "react";

export default function ReportIssueModal({ onClose }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-96 p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Report Issue</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <label className="block mb-2 text-sm font-medium">Issue Type</label>
        <select className="w-full border rounded-lg px-3 py-2 mb-3">
          <option>Select issue type</option>
          <option>Hardware</option>
          <option>Network</option>
          <option>Performance</option>
        </select>

        <label className="block mb-2 text-sm font-medium">Description (Optional)</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 mb-5"
          rows="3"
          placeholder="Describe the issue..."
        ></textarea>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="border border-gray-400 rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Submit Issue
          </button>
        </div>
      </div>
    </div>
  );
}
