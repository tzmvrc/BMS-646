/** @format */

const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event_controller");
const {
  uploadEventImage,
  handleUploadErrors,
} = require("../database/multerConfig");


router.post(
  "/create",
  uploadEventImage.single("event-image"),
  handleUploadErrors,
  eventController.createEvent
);
router.get("/all",eventController.getAllEvents);
router.put(
  "/update/:id",
  uploadEventImage.single("event-image"),
  handleUploadErrors,
  eventController.updateEvent
);
router.delete("/delete/:id",eventController.deleteEvent);

module.exports = router;
