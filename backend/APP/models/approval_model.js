/** @format */

const mongoose = require("mongoose");

const approvalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  rejectionMessage: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Approval", approvalSchema);
