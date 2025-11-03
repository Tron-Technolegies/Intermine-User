import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className="w-full md:w-2/3 relative flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Login-img.png')",
        }}
      >
        <div className="z-10 text-center px-8">
          <img src="/login-logo.png" alt="" />
        </div>
      </div>

      <div className="w-full md:w-1/3 flex flex-col justify-center items-center bg-gray-50 px-8 py-8">
        <div className="w-full max-w-sm">
          {" "}
          <div className="flex justify-center mb-4"></div>
          <div className="text-left mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Hello Again!</h1>
            <p className="text-gray-500 text-sm">Welcome Back</p>
          </div>
          <div className="w-full space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 text-sm" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 text-sm" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm mt-4"
            >
              Login
            </button>
          </div>
          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <button className="text-gray-400 text-xs hover:text-blue-600 transition">
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
