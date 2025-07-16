/** @format */

const cloudinary = require("./cloudinaryConfig");
const fs = require("fs/promises");

const uploadToCloudinary = async (filePath, options = {}) => {
  if (!filePath) throw new Error("File path is required");

  const {
    folder = "misc",
    publicId = `file_${Date.now()}`,
    resource_type = "auto",
    transformation = [],
  } = options;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: publicId,
      overwrite: true,
      resource_type,
      transformation,
    });

    await fs.unlink(filePath).catch(() => {});
    return {
      url: result.secure_url,
      publicId: `${result.folder}/${result.public_id}`,
    };
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};

const deleteCloudinaryFile = async (publicId) => {
  if (!publicId) return;
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });
    console.log("Cloudinary delete result:", result);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

module.exports = { uploadToCloudinary, deleteCloudinaryFile };
