import React from "react";
import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/residents", label: "Residents" },
  { to: "/admin/requests", label: "Requests" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/events", label: "Events" },
];

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white bg-opacity-80 backdrop-blur-sm rounded-full max-w-7xl mx-auto px-6 py-3 mb-8 shadow-sm">
        <div className="flex justify-between items-center">
          <Link
            to="/admin/dashboard"
            className="text-xl font-bold text-gray-800 flex items-center gap-2"
          >
            <img src="/BrgyLogo.png" alt="BMS646 Logo" className="h-8" />
          </Link>
          <div className="flex space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full flex items-center gap-1 transition-colors
                    ${isActive ? "text-black" : "text-gray-800"}
                    group
                  `}
                >
                  {link.label}
                  {/* underline effect */}
                  <span
                    className={`
                      absolute left-4 right-4 -bottom-1 h-[2px] rounded-full transition-all duration-300
                      ${
                        isActive
                          ? "bg-black w-[calc(100%-32px)]"
                          : "bg-black w-0 group-hover:w-[calc(100%-32px)]"
                      }
                    `}
                    style={{
                      transitionProperty: "width,background-color",
                    }}
                  />
                </Link>
              );
            })}
          </div>
          <Link
            to="/admin/profile"
            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
          >
            <User className="w-4 h-4 text-gray-600" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
