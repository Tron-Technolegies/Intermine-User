import React, { useState } from "react";
import { FaLock } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordWithLink } from "../../hooks/useResetPasswordLink";

export default function ResetPasswordFromLink() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { token } = useParams();
  const { isPending, mutateAsync } = useResetPasswordWithLink();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords doesn't match");
      return;
    }
    const data = { token, newPassword: password };
    await mutateAsync(data);
  };
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div
        className="hidden md:flex w-full md:w-2/3 relative items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Login-img.png')" }}
      >
        <div className="z-10 text-center px-8">
          <img
            src="/login-logo.png"
            alt="Login Logo"
            className="mx-auto max-w-[220px] md:max-w-[280px] lg:max-w-[340px]"
          />
        </div>
      </div>

      <div className="w-full md:w-1/3 flex flex-col justify-center items-center px-6 sm:px-10 py-10 md:py-0">
        <div className="md:hidden flex justify-center mb-36 items-center mt-16">
          <img
            src="/logo-mobile.png"
            alt="Mobile Logo"
            className="w-36 sm:w-44"
          />
        </div>

        <div className="w-full max-w-sm sm:max-w-md">
          <div className="text-center md:text-left mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
              Reset Your Password
            </h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 text-sm" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-3xl border border-gray-300 focus:ring-blue-500"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 text-sm" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-3xl border border-gray-300 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-blue-500 text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700"
            >
              {isPending ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
