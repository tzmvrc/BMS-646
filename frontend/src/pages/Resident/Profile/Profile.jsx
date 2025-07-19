
/** @format */
import React, { useState, useEffect } from "react";
import Loader from "../../../components/Loader";
import { User, Mail, Phone, MapPin, Calendar, Edit, Lock, FileText, Clock, CheckCircle, XCircle, AlertCircle, Settings, Trash2 } from "lucide-react";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [user, setUser] = useState({
    name: "Juan Dela Cruz",
    email: "juan.delacruz@example.com",
    role: "Resident",
    address: "123 Main St, Barangay 1",
    contact: "09123456789",
    birthdate: "1990-05-15",
    registrationDate: "2023-01-10",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  });

  const [requestHistory, setRequestHistory] = useState([
    {
      id: 1,
      type: "Barangay Clearance",
      dateSubmitted: "2023-05-10",
      status: "Approved",
      dateProcessed: "2023-05-12",
      description: "Clearance for employment purposes",
    },
    {
      id: 2,
      type: "Certificate of Residency",
      dateSubmitted: "2023-07-22",
      status: "Approved",
      dateProcessed: "2023-07-23",
      description: "Required for school enrollment",
    },
    {
      id: 3,
      type: "Business Permit",
      dateSubmitted: "2023-09-05",
      status: "Pending",
      dateProcessed: null,
      description: "For opening a small convenience store",
    },
    {
      id: 4,
      type: "Complaint",
      dateSubmitted: "2023-10-15",
      status: "Rejected",
      dateProcessed: "2023-10-18",
      description: "Noise complaint against neighbor",
      rejectionReason: "Insufficient evidence provided",
    },
  ]);

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
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl bg-white mx-auto rounded-lg shadow-sm overflow-hidden flex">
        {/* Sidebar with tabs */}
        <div className="w-64 border-r border-gray-200">
          <div className="p-6 text-center">
            <img
              className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md mx-auto"
              src={user.avatar}
              alt="Resident Avatar"
            />
            <h2 className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide mt-2">
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
              Request History
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
            {activeTab === "history" && "Request History"}
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
                      <Phone className="w-4 h-4" /> Contact number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.contact}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.address}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Birthdate
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(user.birthdate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Registration date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {new Date(user.registrationDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
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
              <div className="border-t border-gray-200 pt-4">
                {requestHistory.length > 0 ? (
                  <div className="overflow-hidden rounded-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date Submitted
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {requestHistory.map((request) => (
                          <tr key={request.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {request.type}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {new Date(request.dateSubmitted).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                request.status === "Approved" ? "bg-green-100 text-green-800" :
                                request.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                "bg-red-100 text-red-800"
                              }`}>
                                {
                                  request.status === "Approved" ? <CheckCircle className="w-3 h-3" /> :
                                  request.status === "Pending" ? <Clock className="w-3 h-3" /> :
                                  <XCircle className="w-3 h-3" />
                                }
                                {request.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              <div className="truncate max-w-xs" title={request.description}>
                                {request.description}
                              </div>
                              {request.rejectionReason && (
                                <div className="mt-1 text-xs text-red-600 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  {request.rejectionReason}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No request history found.</p>
                  </div>
                )}
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
                          <label htmlFor="notifications" className="font-medium text-gray-700">Event notifications</label>
                          <p className="text-gray-500">Get notified about upcoming barangay events</p>
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
                          <label htmlFor="updates" className="font-medium text-gray-700">Request updates</label>
                          <p className="text-gray-500">Get notified when your request status changes</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="announcements"
                            name="announcements"
                            type="checkbox"
                            className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="announcements" className="font-medium text-gray-700">Announcements</label>
                          <p className="text-gray-500">Get notified about important barangay announcements</p>
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
