/** @format */

const CertificateRequest = require("../models/certificate_model");
const User = require("../models/user_model");
const path = require("path");
const fs = require("fs/promises");
const { PDFDocument } = require("pdf-lib");
const { uploadToCloudinary } = require("../database/cloudinary");


const formatFancyDate = (date) => {
  const day = date.getDate();
  const suffix = ["th", "st", "nd", "rd"][
    day % 10 > 3 || (day % 100 >= 11 && day % 100 <= 13) ? 0 : day % 10
  ];
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day}${suffix} of ${month}, ${year}`;
};

const requestCertificate = async (req, res) => {
  try {
    const { certificateType, purpose } = req.body;
    const userId = req.user.userId;

    if (!certificateType || !purpose || !userId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    const newRequest = new CertificateRequest({
      userId,
      certificateType,
      purpose,
    });

    await newRequest.save();

    res.status(201).json({
      message: `${certificateType} certificate request submitted.`,
      request: {
        _id: newRequest._id,
        certificateType: newRequest.certificateType,
        purpose: newRequest.purpose,
        status: newRequest.status,
        submittedAt: newRequest.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in requestCertificate:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const approveCertificateRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await CertificateRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.status === "Approved") {
      return res.status(400).json({ message: "Request already approved" });
    }

    request.status = "Approved";
    await request.save();

    res.status(200).json({
      message: `${request.certificateType} request approved.`,
      request,
    });
  } catch (error) {
    console.error("approveCertificateRequest:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const rejectCertificateRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { rejectionMessage } = req.body;

    if (!rejectionMessage) {
      return res.status(400).json({ message: "Rejection message is required" });
    }

    const request = await CertificateRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.status === "Approved") {
      return res.status(400).json({ message: "Request already approved" });
    }

    request.status = "Rejected";
    request.rejectionMessage = rejectionMessage;
    await request.save();

    res.status(200).json({
      message: `${request.certificateType} request rejected.`,
      request,
    });
  } catch (error) {
    console.error("rejectCertificateRequest:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPendingRequests = async (req, res) => {
  try {
    const pendingRequests = await CertificateRequest.find({ status: "Pending" })
      .populate("userId", "firstName lastName address") // fetch basic user info
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json({
      message: "Pending certificate requests fetched successfully.",
      count: pendingRequests.length,
      requests: pendingRequests,
    });
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllCertificateRequestIds = async (req, res) => {
  try {
    const requests = await CertificateRequest.find({}, "_id"); // Only fetch _id field

    const ids = requests.map((req) => req._id);

    res.status(200).json({
      message: "All certificate request IDs fetched successfully.",
      ids,
    });
  } catch (error) {
    console.error("Error fetching certificate request IDs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCertificateRequestStatus = async (req, res) => {
  try {
    const userId = req.user.userId;

    const request = await CertificateRequest.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate("userId");

    if (!request) {
      return res.status(404).json({ message: "No certificate request found" });
    }

    // 🔄 Generate and upload PDF if approved but not yet generated
    if (request.status === "Approved" && !request.generatedFile) {
      const user = request.userId;

      const certificateMap = {
        Residency: {
          file: "residence.pdf",
          fields: ["fullName", "date"],
        },
        Indigency: {
          file: "indigency.pdf",
          fields: ["fullName", "purpose", "date"],
        },
        Clearance: {
          file: "bus_clearance.pdf",
          fields: ["fullName", "business", "date"],
        },
      };

      const config = certificateMap[request.certificateType];
      if (!config) {
        return res.status(400).json({ message: "Unknown certificate type." });
      }

      const templatePath = path.join(__dirname, "../templates", config.file);
      const pdfBytes = await fs.readFile(templatePath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const form = pdfDoc.getForm();

      const fullName = `${user.firstName} ${user.lastName}`;
      const fieldValues = {
        fullName,
        purpose: request.purpose,
        business: request.purpose,
        date: formatFancyDate(new Date()),
      };

      for (const field of config.fields) {
        if (form.getTextField(field)) {
          form.getTextField(field).setText(fieldValues[field] || "");
        }
      }

      form.flatten();
      const finalPdf = await pdfDoc.save();

      // Save temporarily to local folder
      const tempPath = path.join(
        __dirname,
        `../certificates/temp-${Date.now()}.pdf`
      );
      await fs.writeFile(tempPath, finalPdf);

      // Upload to Cloudinary
      let cloudRes;
      try {
        cloudRes = await uploadToCloudinary(tempPath, {
          folder: "certificates",
          resource_type: "raw",
          publicId: `certificate-${user._id}-${Date.now()}`,
        });
      } catch (uploadErr) {
        console.error("❌ Cloudinary upload failed:", uploadErr.message);
        return res
          .status(500)
          .json({
            message: "Cloudinary upload failed",
            error: uploadErr.message,
          });
      }

      // Cleanup safely
      try {
        await fs.access(tempPath);
        await fs.unlink(tempPath);
      } catch (unlinkErr) {
        console.warn("⚠️ File not found for cleanup:", unlinkErr.message);
      }

      // Save cloud link to DB
      request.generatedFile = cloudRes.url;
      await request.save();
    }

    res.status(200).json({
      message: "Certificate request status fetched.",
      status: request.status,
      type: request.certificateType,
      rejectionMessage: request.rejectionMessage || null,
      file: request.status === "Approved" ? request.generatedFile : null,
    });
  } catch (error) {
    console.error("getCertificateRequestStatus:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  requestCertificate,
  approveCertificateRequest,
  rejectCertificateRequest,
  getPendingRequests,
  getAllCertificateRequestIds,
  getCertificateRequestStatus,
};
