import React, { useState, useEffect } from "react";
import Loader from "../../../components/Loader";
import ResidentsTable from "../../../components/ResidentsTable";
import {
  residentsData,
  pendingAccountsData,
} from "../../../data/residentsData";
import {
  Pencil,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Users,
  ClipboardList,
} from "lucide-react";
import StatCard from "../../../components/StatCard";

const stats = [
  {
    label: "Active Residents",
    value: 4800,
    icon: <Users className="w-5 h-5" />,
    color: "bg-green-100 text-green-800",
  },
  {
    label: "Inactive Residents",
    value: 440,
    icon: <Users className="w-5 h-5" />,
    color: "bg-red-100 text-red-800",
  },
  {
    label: "Pending Approvals",
    value: 3,
    icon: <ClipboardList className="w-5 h-5" />,
    color: "bg-yellow-100 text-yellow-800",
  },
];

const Residents = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    status: "Active",
    image: null,
    imagePreview: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Approvals state
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [approvalsLoading, setApprovalsLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isApprovalsModalOpen, setIsApprovalsModalOpen] = useState(false);
  const [rejectionReasons, setRejectionReasons] = useState([]);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("approvals");

  useEffect(() => {
    setResidents(residentsData);
    setPendingAccounts(pendingAccountsData);
    setLoading(false);
    setApprovalsLoading(false);
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          image: e.target.files[0],
          imagePreview: event.target.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setResidents(
        residents.map((resident) =>
          resident.id === editingId
            ? {
                ...resident,
                ...formData,
                image: formData.imagePreview || resident.image,
              }
            : resident
        )
      );
    } else {
      const newResident = {
        id: residents.length + 1,
        ...formData,
        image: formData.imagePreview || "https://via.placeholder.com/150",
      };
      setResidents([...residents, newResident]);
    }

    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      address: "",
      contact: "",
      status: "Active",
      image: null,
      imagePreview: "",
    });
  };

  const handleEdit = (resident) => {
    setFormData({
      name: resident.name,
      address: resident.address,
      contact: resident.contact,
      status: resident.status,
      image: null,
      imagePreview: resident.image,
    });
    setEditingId(resident.id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setResidents(residents.filter((resident) => resident.id !== deletingId));
    setIsDeleteModalOpen(false);
    setDeletingId(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setDeletingId(null);
  };

  // Approvals handlers
  const handleApprove = (id) => {
    setPendingAccounts(pendingAccounts.filter((account) => account.id !== id));
  };

  const handleReject = (id, reasons) => {
    // Here you would typically send the rejection reasons to your backend
    console.log(`Rejected account ${id} with reasons: ${reasons.join(', ')}`);
    setPendingAccounts(pendingAccounts.filter((account) => account.id !== id));
    setIsRejectModalOpen(false);
    setRejectionReasons([]);
  };

  const handleViewDetails = (account) => {
    setSelectedAccount(account);
    setIsApprovalsModalOpen(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
        {/* Tabs for Residents List and Pending Account Approvals */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "approvals"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("approvals")}
            >
              Pending Account Approvals
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "residents"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("residents")}
            >
              Residents List
            </button>
          </div>

          {activeTab === "residents" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Residents List
                </h1>
                <button
                  onClick={() => {
                    setFormData({
                      name: "",
                      address: "",
                      contact: "",
                      status: "Active",
                      image: null,
                      imagePreview: "",
                    });
                    setIsModalOpen(true);
                  }}
                  className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  <Pencil size={16} />
                  Add Resident
                </button>
              </div>
              {/* Residents Table */}
              <div className="overflow-x-auto">
                <ResidentsTable residents={residents} />
              </div>
            </>
          )}

          {activeTab === "approvals" && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Pending Account Approvals
              </h2>
              <div className="overflow-x-auto">
                {approvalsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader />
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Address
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingAccounts.length === 0 ? (
                        <tr>
                          <td
                            colSpan={8}
                            className="text-center py-8 text-gray-500"
                          >
                            No accounts pending approval
                          </td>
                        </tr>
                      ) : (
                        pendingAccounts.map((account) => (
                          <tr key={account.id}>
                            <td
                              className="px-6 py-4 whitespace-nowrap"
                              onClick={() => handleViewDetails(account)}
                            >
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={account.idImage}
                                alt={account.fullName}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className="text-sm font-medium text-gray-900"
                                onClick={() => handleViewDetails(account)}
                              >
                                {account.fullName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className="text-sm text-gray-500"
                                onClick={() => handleViewDetails(account)}
                              >
                                {account.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {account.address}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {account.contactNumber}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {formatDate(account.dateSubmitted)}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex gap-2 justify-center items-center">
                                <button
                                  onClick={() => handleViewDetails(account)}
                                  className="text-gray-600 hover:text-gray-800 flex gap-1"
                                  title="View Details"
                                >
                                  <Eye size={25} />
                                </button>
                                
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-950/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Resident" : "Add New Resident"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>
                <div className="flex items-center">
                  <div className="mr-4 flex-shrink-0">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={
                        formData.imagePreview ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Preview"
                    />
                  </div>
                  <label className="cursor-pointer">
                    <span className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-sm flex items-center gap-2">
                      <Pencil size={14} />
                      Choose Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                    setFormData({
                      name: "",
                      address: "",
                      contact: "",
                      status: "Active",
                      image: null,
                      imagePreview: "",
                    });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 flex items-center gap-2"
                >
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black hover:bg-gray-700 text-white rounded-md flex items-center gap-2"
                >
                  <Pencil size={16} />
                  <span>{editingId ? "Update" : "Save"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-950/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="text-center">
              <Trash2 size={48} className="mx-auto text-red-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">Delete Resident</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this resident? This action
                cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approvals Details Modal */}
      {isApprovalsModalOpen && selectedAccount && (
        <div className="fixed inset-0 bg-gray-950/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Account Details</h2>
            <div className="flex flex-row gap-6">
              {/* Left column - ID Image */}
              <div className="w-1/2">
                <span className="text-xs text-gray-500 block mb-1">Government ID:</span>
                <img
                  src={selectedAccount.idImage}
                  alt={`${selectedAccount.fullName}'s ID`}
                  className="w-full h-auto max-h-80 rounded-lg object-contain border border-gray-200 shadow-sm"
                />
              </div>
              
              {/* Right column - Account Details */}
              <div className="w-1/2">
                <div className="flex flex-col items-start mb-4">
                  <h3 className="font-bold text-lg">{selectedAccount.fullName}</h3>
                  <p className="text-gray-500 text-sm">{selectedAccount.email}</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <span className="text-xs text-gray-500 block">Address:</span>
                    <div className="text-gray-800">{selectedAccount.address}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Contact:</span>
                    <div className="text-gray-800">{selectedAccount.contactNumber}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Date Submitted:</span>
                    <div className="text-gray-800">{formatDate(selectedAccount.dateSubmitted)}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Additional Info:</span>
                    <div className="text-gray-800">{selectedAccount.additionalInfo}</div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 block">Description:</span>
                    <div className="text-gray-700">{selectedAccount.description}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setIsRejectModalOpen(true);
                  setIsApprovalsModalOpen(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  handleApprove(selectedAccount.id);
                  setIsApprovalsModalOpen(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Approve Account
              </button>
              <button
                onClick={() => setIsApprovalsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 ml-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Rejection Reason Modal */}
      {isRejectModalOpen && selectedAccount && (
        <div className="fixed inset-0 bg-gray-950/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Reject Account</h2>
            <p className="text-gray-600 mb-4">
              Please select one or more reasons for rejecting {selectedAccount.fullName}'s account application.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reasons
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-md">
                {[
                  "Invalid ID",
                  "Incomplete Information",
                  "Duplicate Account",
                  "Not a Resident",
                  "Suspicious Activity",
                  "Unclear Photo",
                  "Expired Document",
                  "Information Mismatch",
                  "Other"
                ].map((reason) => (
                  <div key={reason} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`reason-${reason}`}
                      value={reason}
                      checked={rejectionReasons.includes(reason)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setRejectionReasons([...rejectionReasons, reason]);
                        } else {
                          setRejectionReasons(rejectionReasons.filter(r => r !== reason));
                        }
                      }}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor={`reason-${reason}`} className="ml-2 block text-sm text-gray-700">
                      {reason}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsRejectModalOpen(false);
                  setIsApprovalsModalOpen(true);
                  setRejectionReasons([]);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selectedAccount.id, rejectionReasons)}
                disabled={rejectionReasons.length === 0}
                className={`px-4 py-2 rounded-md text-white ${rejectionReasons.length > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Residents;
