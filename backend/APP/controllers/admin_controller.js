/** @format */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin_model");
const Approval = require("../models/approval_model");
const User = require("../models/user_model");

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
      admin: { _id: newAdmin._id, username: newAdmin.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllResidences = async (req, res) => {
  try {
    const approvedUsers = await User.find({ isLoginApproved: true })
      .select("-password") // exclude password
      .sort({ createdAt: -1 }); // optional: newest first

    res.status(200).json({
      message: "Approved residents retrieved successfully",
      data: approvedUsers,
    });
  } catch (error) {
    console.error("Error fetching approved residents:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPendingApprovals = async (req, res) => {
  try {
    const approvals = await Approval.find({ status: "pending" })
      .populate(
        "userId",
        "firstName lastName phoneNumber birthdate address gender isRegisteredVoter isVerified"
      )
      .sort({ submittedAt: -1 });

    res.status(200).json({
      message: "Pending approvals retrieved successfully",
      data: approvals,
    });
  } catch (error) {
    console.error("Error getting pending approvals:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const approveUserRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // Find approval
    const approval = await Approval.findById(id);
    if (!approval) {
      return res.status(404).json({ message: "Approval request not found" });
    }

    // Approve user login
    await User.findByIdAndUpdate(approval.userId, {
      isLoginApproved: true,
    });

    // Update approval status
    approval.status = "approved";
    await approval.save();

    res.status(200).json({ message: "User request approved successfully" });
  } catch (error) {
    console.error("Error approving user request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const rejectUserRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Rejection message is required" });
    }

    const approval = await Approval.findById(id);
    if (!approval) {
      return res.status(404).json({ message: "Approval request not found" });
    }

    // 1. Delete the user from the database
    await User.findByIdAndDelete(approval.userId);

    // 2. Update the approval document
    approval.status = "rejected";
    approval.rejectionMessage = message;
    await approval.save();

    res.status(200).json({
      message: "User request rejected and account deleted",
    });
  } catch (error) {
    console.error("Error rejecting user request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  loginAdmin,
  addAdmin,
  getAllResidences,
  getPendingApprovals,
  approveUserRequest,
  rejectUserRequest,
};
