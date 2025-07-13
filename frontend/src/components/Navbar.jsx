/** @format */
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full mt-4 py-2 px-6 md:px-12 flex justify-between items-center bg-white ">
      <div className="flex items-center">
        <img src="/BrgyLogo.png" alt="BMS646 Logo" className="h-8" />
      </div>

      <div className="hidden md:flex space-x-8">
        <Link to="/" className="text-gray-800 hover:text-blue-600">
          Home
        </Link>
        <Link to="/" className="text-gray-800 hover:text-blue-600">
          Services
        </Link>
        <Link to="/" className="text-gray-800 hover:text-blue-600">
          Residences
        </Link>
        <Link to="/" className="text-gray-800 hover:text-blue-600">
          Events
        </Link>
        <Link to="/" className="text-gray-800 hover:text-blue-600">
          Message
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium">
          Residence
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
