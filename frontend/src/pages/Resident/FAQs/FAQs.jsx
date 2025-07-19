import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQs = () => {
  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I obtain a barangay clearance?",
      answer:
        "You can request a barangay clearance at the barangay hall during office hours (8AM-5PM, Monday to Friday). Bring a valid ID and proof of residence. Processing usually takes 15-30 minutes.",
      contact: "Barangay Secretary: (02) 123-4567",
    },
    {
      id: 2,
      question: "What are the requirements for a business permit?",
      answer:
        "Requirements include: (1) Completed application form, (2) Barangay clearance, (3) Sketch of business location, (4) Proof of business registration, and (5) Valid ID. Fees vary based on business type and size.",
      contact: "Business Permit Office: (02) 123-4568",
    },
    {
      id: 3,
      question: "How can I report a neighborhood concern?",
      answer:
        "You may report concerns: (1) In person at the barangay hall, (2) Through our hotline at (02) 123-4567, or (3) Via email at info@ourbarangay.ph. For emergencies, please call 911 immediately.",
      contact: "Barangay Hotline: (02) 123-4567 (24/7)",
    },
    {
      id: 4,
      question: "What services are available at the health center?",
      answer:
        "Our health center provides: (1) Basic medical consultations, (2) Immunizations, (3) Prenatal and postnatal care, (4) Family planning services, and (5) Basic laboratory tests. Open Monday to Saturday, 8AM-4PM.",
      contact: "Health Center: (02) 123-4569",
    },
    {
      id: 5,
      question: "How do I apply for an indigency certificate?",
      answer:
        "Visit the barangay hall with: (1) Valid ID, (2) Proof of income, (3) Proof of residence, and (4) Completed application form. The social worker will assess your eligibility based on household income and circumstances.",
      contact: "Social Services: (02) 123-4570",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-4xl mx-auto gap-6">
      <div className="max-w-4xl mx-auto ">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about our barangay services
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              layout
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() =>
                  setExpandedId(expandedId === faq.id ? null : faq.id)
                }
                whileHover={{ backgroundColor: "#f8fafc" }}
              >
                <h3 className="font-semibold text-lg text-gray-800">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
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
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                  >
                    <div className="prose prose-sm text-gray-600 mb-4">
                      <p>{faq.answer}</p>
                    </div>
                    <div className="flex items-center bg-blue-50 rounded-md p-3">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      <span className="text-blue-700 font-medium">
                        {faq.contact}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-400 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            Need Immediate Assistance?
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              <span className="text-xl font-semibold">
                Main Office: (02) 123-4567
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              <span className="text-xl font-semibold">Emergency: 911</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
