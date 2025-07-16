const express = require("express");
const router = express.Router();
const {upload, handleUploadErrors} = require("../database/multerConfig");
const userController = require("../controllers/user_controller");

router.get("/user-login", userController.loginUser);
router.post("/user-register",upload.single("valid-id"),handleUploadErrors, userController.registerUser);

module.exports = router;