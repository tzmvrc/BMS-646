/** @format */

const bcrypt = require("bcryptjs");
const axios = require("axios");
require("dotenv").config();
const OTP = require("../models/otp_ model");
const User = require("../models/user_model");

// SEND OTP via SMS using Axios
const sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // ✅ Basic validation
    if (!phoneNumber || !/^\d{11}$/.test(phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Phone number must be 11 digits and is required." });
    }

    // ✅ Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Hash OTP
    const hashedOTP = await bcrypt.hash(otpCode, 10);

    // ✅ Set expiration (5 minutes)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // ✅ Delete old OTPs for this number
    await OTP.deleteMany({ phoneNumber });

    // ✅ Save new OTP to DB
    const newOTP = new OTP({
      phoneNumber,
      otp: hashedOTP,
      expiresAt,
    });

    await newOTP.save();

    // // ✅ Format phone number for ClickSend
    // const formattedNumber = `+63${phoneNumber.slice(1)}`;

    // // ✅ Build message payload
    // const smsMessage = {
    //   messages: [
    //     {
    //       source: "nodejs",
    //       body: `This is from Barangay646. Your OTP code is ${otpCode}. It will expire in 5 minutes.`,
    //       to: formattedNumber,
    //       from: "Barangay646", // Optional: must be approved in ClickSend dashboard
    //     },
    //   ],
    // };

    // // ✅ Send SMS using Axios
    // const response = await axios.post(
    //   "https://rest.clicksend.com/v3/sms/send",
    //   smsMessage,
    //   {
    //     auth: {
    //       username: process.env.CLICKSEND_USERNAME,
    //       password: process.env.CLICKSEND_API_KEY,
    //     },
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // const price = response.data?.messages?.[0]?.message_price || "unknown";

    return res.status(200).json({
      message: "OTP generated successfully (SMS temporarily disabled)",
      otpForTesting: otpCode, // ✅ Return plain OTP for now
    });
  } catch (error) {
    console.error("Error generating OTP:", error.message);
    res.status(500).json({
      message: "Server error while generating OTP",
      error: error.message,
    });
  }
};


const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    // ✅ Check if required fields exist
    if (!phoneNumber || !otp) {
      return res
        .status(400)
        .json({ message: "Phone number and OTP are required." });
    }

    // ✅ Find OTP record
    const otpRecord = await OTP.findOne({ phoneNumber });
    if (!otpRecord) {
      return res
        .status(400)
        .json({ message: "OTP not found. Please request a new one." });
    }

    // ✅ Check if expired
    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpRecord._id }); // Clean up expired OTP
      return res
        .status(400)
        .json({ message: "OTP expired. Please request a new one." });
    }

    // ✅ Compare OTPs (hashed)
    const isMatch = await bcrypt.compare(otp, otpRecord.otp);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect OTP. Please try again." });
    }

    // ✅ OTP is valid — delete it and update user as verified
    await OTP.deleteOne({ _id: otpRecord._id });

    const user = await User.findOneAndUpdate(
      { phoneNumber },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found to mark as verified." });
    }

    return res.status(200).json({
      message: "OTP verified successfully!",
      user: {
        _id: user._id,
        firstName: user.firstName,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  sendOTP,
  verifyOTP,
};
