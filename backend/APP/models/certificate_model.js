/** @format */

const mongoose = require("mongoose");

const CertificateRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  certificateType: {
    type: String,
    enum: ["Residency", "Indigency", "Clearance"],
    required: true,
  },
  purpose: {
    type: String,
    required: [true, "Purpose is required"],
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  rejectionMessage: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  generatedFile: {
    type: String,
  },
});


module.exports = mongoose.model("CertificateRequest", CertificateRequestSchema);
 