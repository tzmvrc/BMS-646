/** @format */

const bcrypt = require("bcryptjs");
const axios = require("axios");
require("dotenv").config();
const nodemailer = require("nodemailer");
const User = require("../models/user_model");
const OTP = require("../models/otp_ model");


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// Verify transporter
transporter.verify((error) => {
  if (error) {
    console.error("| ❌ Transporter Error:", error);
  } else {
    console.log("| ✅ Transporter Ready to Send Emails");
  }
});

// SEND OTP via SMS using Axios
const sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // ✅ Validate phone number format
    // if (!phoneNumber || !/^\d{11}$/.test(phoneNumber)) {
    //   return res
    //     .status(400)
    //     .json({ message: "Phone number must be 11 digits and is required." });
    // }

    // ✅ Check if OTP record exists for this number
    const existingOTP = await OTP.findOne({ phoneNumber });

    if (existingOTP) {
      if (existingOTP.verified) {
        return res.status(400).json({
          message: "Phone number is already linked to an account.",
        });
      } else {
        // Delete old unverified OTP
        await OTP.deleteOne({ _id: existingOTP._id });
      }
    }

    // ✅ Generate and hash new OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otpCode, 10);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // ✅ Save new OTP
    const newOTP = new OTP({
      phoneNumber,
      otp: hashedOTP,
      expiresAt,
      verified: false,
    });

    await newOTP.save();

    // SMS -----------------------------------------------------------------------------------------------------------

    // // 📴 SMS sending logic (disabled for now)
    // const formattedNumber = `+63${phoneNumber.slice(1)}`;
    // const smsMessage = {
    //   messages: [
    //     {
    //       source: "nodejs",
    //       body: `Your OTP is ${otpCode}. It will expire in 5 minutes.`,
    //       to: formattedNumber,
    //       from: "Barangay646",
    //     },
    //   ],
    // };

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

    // EMAIL ---------------------------------------------------------------------------------------------------------------

    await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: phoneNumber,
      subject: "Barangay 646 Verification Code",
      text: `Your verification code for Barangay 646 is: ${otpCode} This code is valid for 5 minutes. Use this code to verify your account.`,
    });

    //---------------------------------------------------------------------------------------------------------------


    return res.status(200).json({
      message: "OTP sent successfully (SMS temporarily disabled).",
      otpForTesting: otpCode,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      message: "Server error while sending OTP",
      error: error.message,
    });
  }
};


const verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res
        .status(400)
        .json({ message: "Phone number and OTP are required." });
    }

    const otpRecord = await OTP.findOne({ phoneNumber });
    if (!otpRecord) {
      return res
        .status(400)
        .json({ message: "OTP not found. Please request a new one." });
    }

    if (otpRecord.verified) {
      return res.status(200).json({
        message: "Phone number already verified.",
        phoneNumber: otpRecord.phoneNumber,
        verified: true,
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res
        .status(400)
        .json({ message: "OTP expired. Please request a new one." });
    }

    const isMatch = await bcrypt.compare(otp, otpRecord.otp);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect OTP. Please try again." });
    }

    // ✅ OTP matched — mark as verified
    otpRecord.verified = true;
    await otpRecord.save();

    return res.status(200).json({
      message: "OTP verified successfully!",
      phoneNumber: otpRecord.phoneNumber,
      verified: otpRecord.verified,
    });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const sendAnnouncementSMS = async (message) => {
  const approvedUsers = await User.find({ isLoginApproved: true });

  if (!approvedUsers.length) return;

  const messages = approvedUsers.map((user) => ({
    source: "nodejs",
    body: message,
    to: `+63${user.phoneNumber.slice(1)}`,
    from: "Barangay646",
  }));

  await axios.post(
    "https://rest.clicksend.com/v3/sms/send",
    { messages },
    {
      auth: {
        username: process.env.CLICKSEND_USERNAME,
        password: process.env.CLICKSEND_API_KEY,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const sendAnnouncementEmail = async (title, description) => {
  const approvedUsers = await User.find({ isLoginApproved: true });

  if (!approvedUsers.length) return;

  await Promise.all(
    approvedUsers.map((user) =>
      transporter.sendMail({
        from: process.env.AUTH_EMAIL,
        to: user.phoneNumber,
        subject: "📢 URGENT ANNOUNCEMENT: " + title,
        text: description,
      })
    )
  );
};


module.exports = {
  sendOTP,
  verifyOTP,
  sendAnnouncementSMS,
  sendAnnouncementEmail,
};
