const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");

router.get("/admin-login", adminController.loginAdmin);
router.post("/admin-add", adminController.addAdmin);
router.get("/all-residences", adminController.getAllResidences);
router.get("/pending-approvals", adminController.getPendingApprovals);
router.put("/approve-request/:id", adminController.approveUserRequest);
router.put("/reject-request/:id", adminController.rejectUserRequest);

module.exports = router;