import React from "react";
import { LuSigma } from "react-icons/lu";
import { BsCheckCircle, BsSlashCircle } from "react-icons/bs";
export default function StatCard({
  title,
  value,
  icon,
  bgColor,
  textColor,
  hashDetails,
  powerDetails,
}) {
  const isHashRate = title === "Hash rate";
  const isPower = title === "Power Consumption";

  return (
    <div className={`rounded-xl p-4 sm:p-5 shadow-sm ${bgColor}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm sm:text-base font-medium text-slate-800">{title}</h3>
        <div className={`${textColor} text-lg sm:text-xl`}>{icon}</div>
      </div>

      {isHashRate && hashDetails ? (
        <div className="grid grid-cols-3 text-center mt-3">
          <div>
            <LuSigma className="mx-auto text-blue-600" />
            <p className="font-semibold">{hashDetails.total}</p>
            <p className="text-xs text-slate-500">TH/s</p>
          </div>

          <div>
            <BsCheckCircle className="mx-auto text-green-600" />
            <p className="font-semibold">{hashDetails.active}</p>
            <p className="text-xs text-slate-500">TH/s</p>
          </div>

          <div>
            <BsSlashCircle className="mx-auto text-yellow-500" />
            <p className="font-semibold">{hashDetails.inactive}</p>
            <p className="text-xs text-slate-500">TH/s</p>
          </div>
        </div>
      ) : isPower && powerDetails ? (
        <div className="grid grid-cols-3 text-center mt-3">
          <div>
            <LuSigma className="mx-auto text-blue-600" />
            <p className="font-semibold">{powerDetails.total}</p>
            <p className="text-xs">KW</p>
          </div>

          <div>
            <BsCheckCircle className="mx-auto text-green-600" />
            <p className="font-semibold">{powerDetails.active}</p>
            <p className="text-xs">KW</p>
          </div>

          <div>
            <BsSlashCircle className="mx-auto text-yellow-500" />
            <p className="font-semibold">{powerDetails.inactive}</p>
            <p className="text-xs">KW</p>
          </div>
        </div>
      ) : (
        <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2">{value}</p>
      )}
    </div>
  );
}
