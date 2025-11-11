import React from "react";
import { CiCalendar } from "react-icons/ci";
import { IoHardwareChipOutline } from "react-icons/io5";

export default function ProfileForm() {
  const user = {
    name: "Jack Wilder",
    email: "jackwilder@example.com",
    joined: "08/12/2024",
    miners: 12,
    image: "", // add image URL to show avatar
  };

  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const inputClass =
    "w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none";

  return (
    <div className="space-y-6 pb-24 sm:pb-12 relative">
      {/* Title */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Profile Settings</h3>
        <p className="text-sm text-gray-500">
          Manage your account information and notification preferences
        </p>
      </div>

      {/* Profile Top Card */}
      <div className="border border-gray-300 rounded-xl bg-white p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        {/* User Info */}
        <div className="flex items-center gap-4 flex-1">
          {/* Avatar */}
          {user.image ? (
            <img
              src={user.image}
              className="w-14 h-14 rounded-full object-cover"
              alt="user avatar"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
              {getInitials(user.name)}
            </div>
          )}

          <div className="min-w-0">
            <p className="font-semibold text-gray-800 text-sm sm:text-base">{user.name}</p>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{user.email}</p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-500 text-xs">
              <div className="flex items-center gap-1">
                <CiCalendar className="text-gray-400" />
                Joined: {user.joined}
              </div>
              <div className="flex items-center gap-1">
                <IoHardwareChipOutline className="text-gray-400" />
                {user.miners} Miners
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="text-sm text-gray-700 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-200 sm:pl-6 pt-4 sm:pt-0">
          <p className="font-medium mb-2 text-gray-800">Choose Notifications</p>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-400" />
              <span className="text-gray-600 text-sm">miners activities</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-400" />
              <span className="text-gray-600 text-sm">strategic infos</span>
            </label>
          </div>
        </div>
      </div>

      {/* FORM FIELDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="border border-gray-300 rounded-xl bg-white p-5 sm:p-6 space-y-4">
          <p className="text-sm font-semibold text-gray-800 mb-2">Personal Information</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className={inputClass} defaultValue="Jack" placeholder="First name" />
            <input className={inputClass} defaultValue="Wilder" placeholder="Last name" />
            <input
              className={`${inputClass} sm:col-span-2`}
              defaultValue="jackwilder@example.com"
              placeholder="Email address"
            />
            <input className={inputClass} defaultValue="Intermine" placeholder="Company" />
            <input
              className={`${inputClass} sm:col-span-2`}
              defaultValue="+1(555)123-4567"
              placeholder="Phone"
            />
          </div>
        </div>

        {/* Address */}
        <div className="border border-gray-300 rounded-xl bg-white p-5 sm:p-6 space-y-4">
          <p className="text-sm font-semibold text-gray-800 mb-2">Address Information</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className={`${inputClass} sm:col-span-2`}
              defaultValue="123 Mining Street"
              placeholder="Street address"
            />

            <input className={inputClass} defaultValue="Austin" placeholder="City" />
            <input className={inputClass} defaultValue="Texas" placeholder="State/Province" />
            <input className={inputClass} defaultValue="78701" placeholder="Zip Code" />

            <select className={inputClass}>
              <option>Germany</option>
              <option>United States</option>
              <option>India</option>
              <option>Canada</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="fixed bottom-0 left-0 w-full px-6 py-4 flex justify-end sm:static sm:justify-end sm:mt-6 z-40">
        <button
          type="button"
          className="w-full sm:w-auto bg-[#2B347A] text-white px-6 py-2 rounded-lg font-medium text-sm sm:text-base shadow-md hover:bg-[#232b67] transition"
          onClick={() => alert("Changes Saved ✅")}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
