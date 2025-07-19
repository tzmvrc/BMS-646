/** @format */
import React, { useState, useEffect } from "react";
import Loader from "../../../components/Loader";
import { User, Mail, Shield, Clock, Calendar, Edit, Lock, Key, Activity, Settings, FileText, Trash2, AlertCircle } from "lucide-react";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    position: "Barangay Secretary",
    department: "Administration",
    lastLogin: "2023-06-15 14:30",
    joinDate: "2022-01-10",
    permissions: ["Manage Residents", "Approve Requests", "Generate Reports", "Manage Events"],
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const handleDeleteAccount = () => {
    // In a real application, this would call an API to delete the account
    alert("Account deletion would be processed here");
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl bg-white mx-auto rounded-lg shadow-sm overflow-hidden flex">
        {/* Sidebar with tabs */}
        <div className="w-64 border-r border-gray-200">
          <div className="p-6 text-center">
            <img
              className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md mx-auto"
              src={user.avatar}
              alt="Admin Avatar"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide mt-2">
              {user.role}
            </span>
          </div>
          
          <nav className="mt-6 px-3">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md mb-2 ${activeTab === "profile" ? "bg-gray-50 text-gray-700" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <User className="mr-3 h-5 w-5" />
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md mb-2 ${activeTab === "history" ? "bg-gray-50 text-gray-700" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <FileText className="mr-3 h-5 w-5" />
              Activity History
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md mb-2 ${activeTab === "settings" ? "bg-gray-50 text-gray-700" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Account Settings
            </button>
          </nav>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 overflow-hidden">
          {/* Profile Header */}
          <div className=" px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">
            {activeTab === "profile" && "Profile Information"}
            {activeTab === "history" && "Activity History"}
            {activeTab === "settings" && "Account Settings"}
          </h1>
        </div>

          {/* Profile Tab Content */}
          {activeTab === "profile" && (
            <div className="px-6 py-4">
              <div className="border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <User className="w-4 h-4" /> Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.name}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.email}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Role
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.role}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Position
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.position}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Join date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(user.joinDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Last login
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.lastLogin}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Key className="w-4 h-4" /> Permissions
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul className="space-y-1">
                        {user.permissions.map((permission, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                            {permission}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
              
              {/* Actions */}
              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center gap-2">
                  <Edit className="w-4 h-4" /> Edit Profile
                </button>
                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Change Password
                </button>
              </div>
            </div>
          )}
          
          {/* History Tab Content */}
          {activeTab === "history" && (
            <div className="px-6 py-4">
              <div className="border-t border-gray-200 ">
               
               
                
                <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Activity Log</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Updated resident record</span>
                      <span className="text-sm text-gray-500">2023-06-15 10:30</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Modified contact information for Juan Dela Cruz</p>
                  </div>
                  <div className="bg-white p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Approved request</span>
                      <span className="text-sm text-gray-500">2023-06-14 15:20</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Approved barangay clearance request from Maria Santos</p>
                  </div>
                  <div className="bg-white p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Created new event</span>
                      <span className="text-sm text-gray-500">2023-06-13 09:45</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Added Barangay Clean-up Drive event for June 20, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Settings Tab Content */}
          {activeTab === "settings" && (
            <div className="px-6 py-4">
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage your email notification preferences</p>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="notifications"
                            name="notifications"
                            type="checkbox"
                            className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="notifications" className="font-medium text-gray-700">New requests</label>
                          <p className="text-gray-500">Get notified when a new request is submitted</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="updates"
                            name="updates"
                            type="checkbox"
                            className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="updates" className="font-medium text-gray-700">System updates</label>
                          <p className="text-gray-500">Get notified about system updates and maintenance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Account Security</h3>
                    <p className="mt-1 text-sm text-gray-500">Update your password and security settings</p>
                    <div className="mt-4 space-y-4">
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Change Password
                      </button>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="twoFactor"
                            name="twoFactor"
                            type="checkbox"
                            className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="twoFactor" className="font-medium text-gray-700">Two-factor authentication</label>
                          <p className="text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" /> Danger Zone
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Irreversible and destructive actions</p>
                    <div className="mt-4">
                      <button 
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Delete Account Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex items-center justify-center text-red-600 mb-4">
                  <AlertCircle className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Delete Account</h3>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Profile;
