import React from "react";
import { FiActivity, FiZap } from "react-icons/fi";
import { LuSigma } from "react-icons/lu";
import { BsCheckCircle, BsSlashCircle } from "react-icons/bs";

export default function StatCard({ title, value, icon, bgColor, textColor }) {
  const isHashRate = title === "Hash rate";
  const isPower = title === "Power Consumption";

  return (
    <div
      className={`rounded-2xl p-5 shadow-sm ${bgColor} flex flex-col gap-3 transition hover:shadow-md`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-slate-800 text-base sm:text-lg">{title}</h3>
        <div className={`${textColor} text-xl`}>{icon}</div>
      </div>

      {/* For Hashrate / Power Consumption */}
      {isHashRate || isPower ? (
        <div className="grid grid-cols-3 text-center mt-3">
          {/* Total */}
          <div>
            <LuSigma className="mx-auto text-blue-600 text-lg sm:text-xl mb-1" />
            <p className="font-semibold text-slate-800 text-sm sm:text-base">
              {isHashRate ? "84.2" : "22.2"}
            </p>
            <p className="text-xs text-slate-500">{isHashRate ? "TH/s" : "KW"}</p>
          </div>

          {/* Active */}
          <div>
            <BsCheckCircle className="mx-auto text-green-600 text-lg sm:text-xl mb-1" />
            <p className="font-semibold text-slate-800 text-sm sm:text-base">20.0</p>
            <p className="text-xs text-slate-500">{isHashRate ? "TH/s" : "KW"}</p>
          </div>

          {/* Inactive */}
          <div>
            <BsSlashCircle className="mx-auto text-yellow-500 text-lg sm:text-xl mb-1" />
            <p className="font-semibold text-slate-800 text-sm sm:text-base">00.0</p>
            <p className="text-xs text-slate-500">{isHashRate ? "TH/s" : "KW"}</p>
          </div>
        </div>
      ) : (
        // For Normal Cards (Total Miners, Total Repairs)
        <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
      )}
    </div>
  );
}
