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

  const handleCloseModal = () => {
    setActiveModal(null);
    setShowDropdown(false);
  };

  return (
    <>
      {/* Main Card */}
      <div className="bg-[#F7F8F9] rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition relative">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start mb-3 pt-2 gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 truncate">
              {miner.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">Serial: {miner.serial}</p>
          </div>
          <div className="flex gap-2 items-center">
            <span
              className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full ${
                miner.status === "Online"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {miner.status}
            </span>
            <div className="relative">
              <BsThreeDotsVertical
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-gray-500 cursor-pointer hover:text-gray-700 text-lg sm:text-base"
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white border border-[#D9D9D9] rounded-lg shadow-md w-36 sm:w-40 z-20">
                  <button
                    onClick={() => setActiveModal("report")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Report Issue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hashrate + Power */}
        <div className="flex flex-wrap justify-between mb-4 p-3 bg-white/30 rounded-lg gap-4 sm:gap-0">
          <div className="flex flex-col items-start flex-1 min-w-[130px]">
            <div className="flex items-center gap-2 text-gray-700">
              <PiCpuLight className="text-indigo-600 text-lg" />
              <span className="font-semibold text-gray-800 text-sm sm:text-base">
                {miner.hashrate}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">Hash Rate</p>
          </div>

          <div className="flex flex-col items-start flex-1 min-w-[130px]">
            <div className="flex items-center gap-2 text-gray-700">
              <FaBolt className="text-yellow-500 text-lg" />
              <span className="font-semibold text-gray-800 text-sm sm:text-base">
                {miner.power}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">Power</p>
          </div>
        </div>

        {/* Warranty */}
        <div className="bg-[#E6F1FD] p-3 sm:p-4 rounded-lg flex flex-wrap justify-between items-center gap-3 mb-3">
          <div className="flex items-center gap-2">
            <BsShieldCheck className="text-blue-600 text-lg" />
            <div>
              <p className="font-semibold text-gray-800 text-sm">Warranty</p>
              <p className="text-xs text-gray-500">{miner.warranty}</p>
            </div>
          </div>
          <span className="text-xs sm:text-sm bg-blue-600 text-white px-3 py-1 rounded-full">
            Active
          </span>
        </div>

        {/* Worker & Pool */}
        <div className="border-t border-gray-200 p-3 text-sm">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <p className="font-medium text-gray-800">Worker & Pool</p>
            <FiEdit2
              onClick={() => setActiveModal("request")}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
            />
          </div>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm break-all">
            Worker : <span className="text-gray-400">{miner.worker}</span>
          </p>
          <p className="text-gray-600 text-xs sm:text-sm break-all">
            Pool : <span className="text-gray-400">{miner.pool}</span>
          </p>
        </div>

        {/* Purchased + History */}
        <div className="flex flex-wrap justify-between items-center text-xs sm:text-sm text-gray-600 mt-3 p-3 border-t border-gray-200 gap-3">
          <div className="flex items-center gap-2">
            <CiCalendar className="text-gray-500 text-sm" />
            <span>Purchased : {miner.purchased}</span>
          </div>
          <button
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium border-[#D9D9D9] border px-3 py-1 rounded-lg text-xs sm:text-sm"
            onClick={() => setActiveModal("history")}
          >
            <FiClock className="text-gray-500" /> History
          </button>
        </div>
      </div>

      {/* Overlay Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          {activeModal === "history" && <HistoryModal onClose={handleCloseModal} />}
          {activeModal === "report" && <ReportIssueModal onClose={handleCloseModal} />}
          {activeModal === "request" && <RequestChangeModal onClose={handleCloseModal} />}
        </div>
      )}
    </>
  );
}
