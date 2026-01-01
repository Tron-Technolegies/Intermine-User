import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUpdatePassword } from "../../hooks/useUpdatePassword";
import Loading from "../Loading";

export default function PasswordUpdate() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isPending, updatePassword } = useUpdatePassword();
  const inputClass =
    "w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none";

  function handleSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.warn("Passwords doesnt match");
      return;
    }
    updatePassword({ oldPassword, newPassword });
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }
  return (
    <div className="border border-gray-300 rounded-xl bg-white p-5 my-5">
      <p className="text-sm font-semibold text-gray-800 mb-2">
        Update Password
      </p>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="text-xs">Current Password</label>
        <input
          className={inputClass}
          type="password"
          placeholder="Enter Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label className="text-xs">New Password</label>
        <input
          className={inputClass}
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label className="text-xs">Confirm New Password</label>
        <input
          className={inputClass}
          type="password"
          placeholder="Confirm new Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-fit bg-[#2B347A] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#232b67]"
        >
          Update
        </button>
        {isPending && <Loading />}
      </form>
    </div>
  );
}
