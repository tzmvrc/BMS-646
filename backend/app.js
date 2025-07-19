/** @format */

// app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./APP/database/mongodb");
const startAnnouncementCron = require("./APP/middleware/cronjobs");

const app = express();
connectDB.mongodb(); // Connect to MongoDB
startAnnouncementCron();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// Import Routes
const adminRoutes = require("./APP/routers/admin_router");
const userRoutes = require("./APP/routers/user_router");
const otpRoutes = require("./APP/routers/otp_router");
const certificateRoutes = require("./APP/routers/certificate_router");
const eventRoutes = require("./APP/routers/event_router");
const announceRoutes = require("./APP/routers/announcement_router");
const cencusRoutes = require("./APP/routers/cencus_router");


// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/announcement", announceRoutes);
app.use("/api/barangay", cencusRoutes);

app.get("/", (req, res) => {
  res.json({ data: "Hello from server" });
});

module.exports = app;
