/** @format */

const express = require("express");
const router = express.Router();
const requestCertificate = require("../controllers/certificate_controller");
const { authenticateToken } = require("../middleware/auth");

router.post(
  "/request",
  authenticateToken,
  requestCertificate.requestCertificate
);
router.put(
  "/approve/:requestId",
  authenticateToken,
  requestCertificate.approveCertificateRequest
);
router.put(
  "/reject/:requestId",
  authenticateToken,
  requestCertificate.rejectCertificateRequest
);
router.get(
  "/pending",
  authenticateToken,
  requestCertificate.getPendingRequests
);

router.get(
  "/all-requests",
  authenticateToken,
  requestCertificate.getAllCertificateRequestIds
);

router.get(
  "/status",
  authenticateToken,
  requestCertificate.getCertificateRequestStatus
);



module.exports = router;
