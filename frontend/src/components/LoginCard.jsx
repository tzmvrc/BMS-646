/** @format */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md transition-all duration-500 transform preserve-3d">
      <div className="flex justify-center mb-4">
        <div className="flex items-center">
          <img src="/BrgyLogo.png" alt="BMS646 Logo" className="h-10 sm:h-12" />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2">
        Sign in to continue
      </h2>
      <p className="text-sm sm:text-base text-gray-500 text-center mb-6">
        Please sign in to start your session
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none text-sm sm:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <Lock className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full outline-none text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-black transition-colors mb-4 text-sm sm:text-base"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
