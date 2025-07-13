import React from "react";

const colorMap = {
  green: "bg-green-100 text-green-800 hover:bg-green-200",
  blue: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  purple: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  orange: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  secondary: "bg-white text-black-600 border border-gray-200 hover:bg-gray-100",
  default: "bg-black text-white hover:bg-gray-700",
};

const QuickActionButton = ({ icon, label, color = "default", ...props }) => (
  <button
    className={`p-3 rounded-lg text-sm font-medium transition flex flex-col items-center ${
      colorMap[color] || colorMap.default
    }`}
    {...props}
  >
    {icon}
    {label}
  </button>
);

export default QuickActionButton;
