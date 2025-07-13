import { useState, useEffect } from "react";
import AdminNavbar from "../../../components/AdminNavbar";
import Loader from "../../../components/Loader";
import {
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  Home,
  Phone,
  User,
  FileText,
  FileBadge,
  IdCard,
  AlertTriangle,
  BookOpen,
  MoreHorizontal,
} from "lucide-react";

const Request = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    status: "Pending",
    image: null,
    imagePreview: "",
    requestType: "E-Blotter",
    specifyRequest: "",
    description: "",
    dateSubmitted: new Date().toISOString().split("T")[0],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Pending");
  const [showSpecify, setShowSpecify] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewedRequest, setViewedRequest] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Simulate API call with sample data
    setTimeout(() => {
      setResidents([
        {
          id: 1,
          name: "Juan Dela Cruz",
          address: "123 Main St, Barangay 1",
          contact: "09123456789",
          status: "Approved",
          image: "https://randomuser.me/api/portraits/men/1.jpg",
          requestType: "ID Registration",
          dateSubmitted: "2024-05-15",
          description: "Request for Barangay ID registration blah blah blah",
        },
        {
          id: 2,
          name: "Maria Santos",
          address: "456 Oak St, Barangay 1",
          contact: "09234567890",
          status: "Pending",
          image: "https://randomuser.me/api/portraits/women/1.jpg",
          requestType: "Certificate Request",
          dateSubmitted: "2024-06-01",
          description: "Request for Barangay ID registration blah blah blah",
        },
        {
          id: 3,
          name: "Pedro Reyes",
          address: "789 Pine St, Barangay 1",
          contact: "09345678901",
          status: "Rejected",
          image: "https://randomuser.me/api/portraits/men/2.jpg",
          requestType: "Complaint",
          dateSubmitted: "2024-05-20",
          description: "Request for Barangay ID registration blah blah blah",
        },
        {
          id: 4,
          name: "Ana Hernandez",
          address: "321 Elm St, Barangay 1",
          contact: "09456789012",
          status: "Pending",
          image: "https://randomuser.me/api/portraits/women/2.jpg",
          requestType: "Permit Application",
          dateSubmitted: "2024-06-05",
          description: "Request for Barangay ID registration blah blah blah",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredResidents = residents.filter(
    (resident) => resident.status === activeTab
  );

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

  const serviceTypes = [
    {
      value: "E-Blotter",
      label: "E-Blotter",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      value: "Clearance",
      label: "Barangay Clearance",
      icon: <FileBadge className="w-5 h-5" />,
    },
    {
      value: "Indigency",
      label: "Certificate of Indigency",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      value: "Brgy ID",
      label: "Barangay ID",
      icon: <IdCard className="w-5 h-5" />,
    },
    {
      value: "Complaint",
      label: "Complaint",
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
      value: "Other",
      label: "Other",
      icon: <MoreHorizontal className="w-5 h-5" />,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // Show specify input if "Other" is selected
      if (name === "requestType") {
        return {
          ...prev,
          [name]: value,
          specifyRequest: "",
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
    if (name === "requestType") {
      setShowSpecify(value === "Other");
    }
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
      status: "Pending",
      image: null,
      imagePreview: "",
      requestType: "E-Blotter",
      specifyRequest: "",
      description: "",
      dateSubmitted: new Date().toISOString().split("T")[0],
    });
  };

  const handleEdit = (resident) => {
    setFormData({
      name: resident.name,
      address: resident.address,
      contact: resident.contact,
      status: resident.status,
      requestType: resident.requestType,
      dateSubmitted: resident.dateSubmitted,
      image: null,
      imagePreview: resident.image,
      specifyRequest: resident.specifyRequest || "",
      description: resident.description || "",
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="text-green-500" size={16} />;
      case "Rejected":
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-yellow-500" size={16} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusCount = (status) => {
    return residents.filter((resident) => resident.status === status).length;
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
      <div className="max-w-7xl mx-auto mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Resident Requests
            </h1>
            <button
              onClick={() => {
                setFormData({
                  name: "",
                  address: "",
                  contact: "",
                  status: "Pending",
                  image: null,
                  imagePreview: "",
                  requestType: "E-Blotter",
                  specifyRequest: "",
                  description: "",
                  dateSubmitted: new Date().toISOString().split("T")[0],
                });
                setShowSpecify(false);
                setIsModalOpen(true);
              }}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Pencil size={16} />
              Add Request
            </button>
          </div>

          {/* Status Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "Pending"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("Pending")}
            >
              <Clock size={16} />
              Pending ({getStatusCount("Pending")})
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "Approved"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("Approved")}
            >
              <CheckCircle2 size={16} />
              Approved ({getStatusCount("Approved")})
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === "Rejected"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("Rejected")}
            >
              <XCircle size={16} />
              Rejected ({getStatusCount("Rejected")})
            </button>
          </div>

          {/* Requests Grid */}
          {filteredResidents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No {activeTab.toLowerCase()} requests found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResidents.map((resident) => (
                <div
                  key={resident.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={resident.image}
                          alt={resident.name}
                        />
                        <div>
                          <h3 className="font-bold text-lg">{resident.name}</h3>
                          <p className="text-gray-500 text-sm">
                            {resident.requestType}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusClass(
                          resident.status
                        )}`}
                      >
                        {getStatusIcon(resident.status)}
                        {resident.status}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Home className="mr-2" size={14} />
                        {resident.address}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="mr-2" size={14} />
                        {resident.contact}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="mr-2" size={14} />
                        Submitted on {formatDate(resident.dateSubmitted)}
                      </div>
                    </div>

                    {/* View button to open modal */}
                    <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        Request ID: #{resident.id.toString().padStart(4, "0")}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setViewedRequest(resident);
                            setViewModal(true);
                          }}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full"
                          title="View"
                        >
                          <User size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(resident)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(resident.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Request Modal */}
      {viewModal && viewedRequest && (
        <div className="fixed inset-0 bg-gray-950/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Request Details</h2>
            <div className="flex flex-col items-center mb-4">
              <img
                src={viewedRequest.image}
                alt={viewedRequest.name}
                className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-white shadow-sm"
              />
              <h3 className="font-bold text-lg">{viewedRequest.name}</h3>
              <p className="text-gray-500 text-sm">
                {viewedRequest.requestType}
              </p>
            </div>
            <div className="mb-2">
              <span className="text-xs text-gray-500">Address:</span>
              <div>{viewedRequest.address}</div>
            </div>
            <div className="mb-2">
              <span className="text-xs text-gray-500">Contact:</span>
              <div>{viewedRequest.contact}</div>
            </div>
            <div className="mb-2">
              <span className="text-xs text-gray-500">Date Submitted:</span>
              <div>{formatDate(viewedRequest.dateSubmitted)}</div>
            </div>
            <div className="mb-2">
              <span className="text-xs text-gray-500">Status:</span>
              <div>{viewedRequest.status}</div>
            </div>
            <div className="mb-2">
              <span className="text-xs text-gray-500">Description:</span>
              <div className="text-gray-700">{viewedRequest.description}</div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setViewModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-950/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Resident Request" : "Add New Request"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Request Type
                    </label>
                    <select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    >
                      {serviceTypes.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {showSpecify && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please specify request
                      </label>
                      <input
                        type="text"
                        name="specifyRequest"
                        value={formData.specifyRequest || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required={showSpecify}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Submission Date
                    </label>
                    <input
                      type="date"
                      name="dateSubmitted"
                      value={formData.dateSubmitted}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    {/* Always show textarea for editing/adding */}
                    <textarea
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Provide details about your request"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingId(null);
                    setFormData({
                      name: "",
                      address: "",
                      contact: "",
                      status: "Pending",
                      image: null,
                      imagePreview: "",
                      requestType: "E-Blotter",
                      specifyRequest: "",
                      description: "",
                      dateSubmitted: new Date().toISOString().split("T")[0],
                    });
                    setShowSpecify(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md flex items-center gap-2"
                >
                  <Pencil size={16} />
                  {editingId ? "Update Request" : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-950/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="text-center">
              <Trash2 size={48} className="mx-auto text-red-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">Delete Request</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this request record? This action
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
    </div>
  );
};

export default Request;
