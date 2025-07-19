/** @format */

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

// ✅ Shared file filter
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG and PNG images are allowed."),
      false
    );
  }
};

// ✅ Valid ID upload storage
const validIdStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const userId = req.user?.userId || "unknown";
    const timestamp = Date.now();
    const originalName = file.originalname.split(".")[0];
    const publicId = `valid-id/${userId}_${timestamp}_${originalName}`;

    return {
      folder: "valid-id",
      public_id: publicId,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [
        { width: 800, height: 500, crop: "limit", quality: "auto" },
        { fetch_format: "auto" },
      ],
      resource_type: "image",
    };
  },
});

// ✅ Event Image upload storage
const eventImageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const timestamp = Date.now();
    const originalName = file.originalname.split(".")[0];
    const publicId = `event-image/${timestamp}_${originalName}`;

    return {
      folder: "event-image",
      public_id: publicId,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [
        { width: 800, height: 500, crop: "limit", quality: "auto" },
        { fetch_format: "auto" },
      ],
      resource_type: "image",
    };
  },
});

// ✅ Multer instances
const uploadValidId = multer({
  storage: validIdStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
});

const uploadEventImage = multer({
  storage: eventImageStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
});

// ✅ Error handler middleware
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message:
        err.code === "LIMIT_FILE_SIZE"
          ? "File too large. Max 5MB allowed."
          : "File upload error",
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "File upload failed",
    });
  }
  next();
};

module.exports = {
  uploadValidId,
  uploadEventImage,
  handleUploadErrors,
};
