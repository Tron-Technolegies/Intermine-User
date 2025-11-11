import React from "react";
import { LuSigma } from "react-icons/lu";
import { BsCheckCircle, BsSlashCircle } from "react-icons/bs";

export default function StatCard({ title, value, icon, bgColor, textColor }) {
  const isHashRate = title === "Hash rate";
  const isPower = title === "Power Consumption";

  return (
    <div
      className={`rounded-xl p-4 sm:p-5 shadow-sm ${bgColor} flex flex-col gap-2 sm:gap-3 transition hover:shadow-md`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-slate-800 text-sm sm:text-base truncate">{title}</h3>
        <div className={`${textColor} text-lg sm:text-xl`}>{icon}</div>
      </div>

      {/* Hashrate / Power */}
      {isHashRate || isPower ? (
        <div className="grid grid-cols-3 text-center mt-2 sm:mt-3">
          {/* Total */}
          <div>
            <LuSigma className="mx-auto text-blue-600 text-base sm:text-lg mb-1" />
            <p className="font-semibold text-slate-800 text-xs sm:text-sm">
              {isHashRate ? "84.2" : "22.2"}
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500">{isHashRate ? "TH/s" : "KW"}</p>
          </div>

          {/* Active */}
          <div>
            <BsCheckCircle className="mx-auto text-green-600 text-base sm:text-lg mb-1" />
            <p className="font-semibold text-slate-800 text-xs sm:text-sm">20.0</p>
            <p className="text-[10px] sm:text-xs text-slate-500">{isHashRate ? "TH/s" : "KW"}</p>
          </div>

          {/* Inactive */}
          <div>
            <BsSlashCircle className="mx-auto text-yellow-500 text-base sm:text-lg mb-1" />
            <p className="font-semibold text-slate-800 text-xs sm:text-sm">00.0</p>
            <p className="text-[10px] sm:text-xs text-slate-500">{isHashRate ? "TH/s" : "KW"}</p>
          </div>
        </div>
      ) : (
        <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1 sm:mt-2">{value}</p>
      )}
    </div>
  );
}
