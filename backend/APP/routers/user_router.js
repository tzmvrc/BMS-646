/** @format */

const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const {
  uploadValidId,
  handleUploadErrors,
} = require("../database/multerConfig");
const userController = require("../controllers/user_controller");

router.get("/user-login", userController.loginUser);
router.post(
  "/user-register",
  uploadValidId.single("valid-id"),
  handleUploadErrors,
  userController.registerUser
);

router.put("/change-password",authenticateToken, userController.changePassword);

module.exports = router;
