import React, { useState } from "react";
import { BsThreeDotsVertical, BsShieldCheck } from "react-icons/bs";
import { FiEdit2, FiClock } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { FaBolt } from "react-icons/fa6";
import { PiCpuLight } from "react-icons/pi";

import HistoryModal from "./HistoryModal";
import ReportIssueModal from "./ReportIssueModal";
import RequestChangeModal from "./RequestChangeModal";

export default function MinerCard({ miner }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const handleClose = () => {
    setActiveModal(null);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="bg-[#F7F8F9] rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-3 pt-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-800">
              {miner.model}
            </h3>
            <p className="text-sm text-gray-500">
              Serial: {miner.serialNumber}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                miner.status === "online"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {miner.status}
            </span>

            {/* Dropdown */}
            <div className="relative">
              <BsThreeDotsVertical
                onClick={() => setShowDropdown(!showDropdown)}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              />

              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white  rounded-lg shadow-md w-40 z-20">
                  <button
                    onClick={() => setActiveModal("report")}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Report Issue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {miner.trackingLink && (
          <div className="text-sm">Track - {miner.trackingLink}</div>
        )}

        {/* Hashrate + Power */}
        <div className="flex justify-between mb-4 p-3 bg-white/40 rounded-lg">
          <div>
            <div className="flex items-center gap-1 text-gray-700">
              <PiCpuLight className="text-indigo-600" />
              <span className="font-semibold">{miner.hashRate}</span>
            </div>
            <p className="text-xs text-gray-500">Hashrate</p>
          </div>

          <div>
            <div className="flex items-center gap-1 text-gray-700">
              <FaBolt className="text-yellow-500" />
              <span className="font-semibold">{miner.power}</span>
            </div>
            <p className="text-xs text-gray-500">Power</p>
          </div>
        </div>

        {/* Warranty */}
        <div className="bg-[#E6F1FD] p-3 mb-3 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BsShieldCheck className="text-blue-600" />
            <div>
              <p className="font-semibold text-sm text-gray-800">Warranty</p>
              <p className="text-xs text-gray-500">{miner.warranty} years</p>
            </div>
          </div>

          <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
            Active
          </span>
        </div>

        {/* Worker & Pool */}
        <div className="border-t border-[#DADEE6] p-3 text-sm">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800">Worker & Pool</p>

            <FiEdit2
              onClick={() => setActiveModal("request")}
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            />
          </div>

          <p className="text-gray-600 text-xs">
            Worker: <span className="text-gray-400">{miner.workerId}</span>
          </p>
          <p className="text-gray-600 text-xs">
            Pool: <span className="text-gray-400">{miner.poolAddress}</span>
          </p>
        </div>

        {/* Purchased + History */}
        <div className="flex justify-between items-center text-xs text-gray-600 mt-3 p-3 border-t border-[#DADEE6]">
          <div className="flex items-center gap-1">
            <CiCalendar />
            <span>
              Purchased: {new Date(miner.connectionDate).toLocaleDateString()}
            </span>
          </div>

          <button
            onClick={() => setActiveModal("history")}
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 border px-3 py-1 rounded-lg"
          >
            <FiClock /> History
          </button>
        </div>
      </div>

      {/* MODALS */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          {activeModal === "history" && (
            <HistoryModal onClose={handleClose} miner={miner} />
          )}
          {activeModal === "report" && (
            <ReportIssueModal onClose={handleClose} miner={miner} />
          )}
          {activeModal === "request" && (
            <RequestChangeModal onClose={handleClose} miner={miner} />
          )}
        </div>
      )}
    </>
  );
}
