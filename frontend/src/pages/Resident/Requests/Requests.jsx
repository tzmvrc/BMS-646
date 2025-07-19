import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Requests = () => {
  const [activeDocument, setActiveDocument] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const documentTypes = [
    {
      id: 1,
      name: "Barangay Clearance",
      description: "Required for various government transactions",
      fields: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        {
          name: "address",
          label: "Complete Address",
          type: "text",
          required: true,
        },
        { name: "purpose", label: "Purpose", type: "text", required: true },
      ],
    },
    {
      id: 2,
      name: "Business Permit",
      description: "Required for operating local businesses",
      fields: [
        {
          name: "businessName",
          label: "Business Name",
          type: "text",
          required: true,
        },
        {
          name: "ownerName",
          label: "Owner Name",
          type: "text",
          required: true,
        },
        {
          name: "businessAddress",
          label: "Business Address",
          type: "text",
          required: true,
        },
        {
          name: "businessType",
          label: "Type of Business",
          type: "text",
          required: true,
        },
      ],
    },
    {
      id: 3,
      name: "Indigency Certificate",
      description: "For availing government assistance programs",
      fields: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        {
          name: "address",
          label: "Complete Address",
          type: "text",
          required: true,
        },
        {
          name: "familyMembers",
          label: "Number of Family Members",
          type: "number",
          required: true,
        },
        {
          name: "monthlyIncome",
          label: "Monthly Income",
          type: "number",
          required: true,
        },
      ],
    },
    {
      id: 4,
      name: "E-Blotter",
      description: "For reporting incidents to the barangay",
      fields: [
        {
          name: "complainantName",
          label: "Complainant Name",
          type: "text",
          required: true,
        },
        {
          name: "respondentName",
          label: "Respondent Name",
          type: "text",
          required: false,
        },
        {
          name: "incidentDate",
          label: "Incident Date",
          type: "date",
          required: true,
        },
        {
          name: "incidentDetails",
          label: "Incident Details",
          type: "textarea",
          required: true,
        },
      ],
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      documentType: activeDocument.name,
      ...formData,
    });
    setIsSubmitted(true);
    setFormData({});
  };

  const resetForm = () => {
    setActiveDocument(null);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen py-8 flex flex-col p-4 max-w-7xl mx-auto gap-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {!activeDocument ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                Request Barangay Documents
              </h1>
              <p className="text-gray-600">
                Select the document you need to request
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {documentTypes.map((doc) => (
                <motion.div
                  key={doc.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:border-gray-500 transition-colors"
                  onClick={() => setActiveDocument(doc)}
                  whileHover={{ y: -2 }}
                  layoutId={`card-${doc.id}`}
                >
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {doc.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{doc.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ) : isSubmitted ? (
          <motion.div
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-green-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Request Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your {activeDocument.name} request has been received. You'll be
              notified once it's ready.
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Request Another Document
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <motion.div
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer"
              layoutId={`card-${activeDocument.id}`}
              onClick={() => setActiveDocument(null)}
              whileHover={{ backgroundColor: "#f8fafc" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {activeDocument.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {activeDocument.description}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
              </div>
            </motion.div>

            <AnimatePresence>
              <motion.div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {activeDocument.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleInputChange}
                          required={field.required}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                          rows="3"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleInputChange}
                          required={field.required}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                      )}
                    </div>
                  ))}

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
