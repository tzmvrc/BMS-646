/** @format */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user_model");
const Approval = require("../models/approval_model");

const loginUser = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      user: { _id: user._id, phoneNumber: user.phoneNumber },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      password,
      birthdate,
      address,
      gender,
    } = req.body;

    // ✅ Validate required fields
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !password ||
      !birthdate ||
      !address ||
      !gender
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Validate image
    if (!req.file) {
      return res.status(400).json({ message: "Valid ID image is required" });
    }

    if (!/^\d{11}$/.test(phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Phone number must be exactly 11 digits" });
    }

    // ✅ Check for existing user
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser && existingUser.isLoginApproved) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Extract Cloudinary data
    const imageUrl = req.file.path; // secure_url
    let publicId = imageUrl
      .split("/")
      .slice(-2)
      .join("/")
      .replace(/\.[^.]+$/, "");

    publicId = decodeURIComponent(publicId);

    // ✅ Save new user
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword,
      birthdate: new Date(birthdate),
      address,
      gender,
      idImage: imageUrl,
      idImagePublicId: publicId,
      isRegisteredVoter: false,
      isLoginApproved: false,
      isVerified: false,
    });

    await newUser.save();

    // ✅ Create approval entry
    const newApproval = new Approval({
      userId: newUser._id,
    });

    await newApproval.save();

    res.status(201).json({
      message: "Registration successful. Wait for admin approval.",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phoneNumber,
        isLoginApproved: newUser.isLoginApproved,
        isRegisteredVoter: newUser.isRegisteredVoter,
        isVerified: newUser.isVerified,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  loginUser,
  registerUser,
};
