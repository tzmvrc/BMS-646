const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.get("/user-login", userController.loginUser);
router.post("/user-register", userController.registerUser);

module.exports = router;