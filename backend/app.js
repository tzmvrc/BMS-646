/** @format */

// app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./APP/database/db_connect");

const app = express();
connectDB.connectDB(); // Connect to MongoDB

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// Import Routes
const adminRoutes = require("./APP/routers/admin_router");
const userRoutes = require("./APP/routers/user_router");
const otpRoutes = require("./APP/routers/otp_router");

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/otp", otpRoutes);

app.get("/", (req, res) => {
  res.json({ data: "Hello from server" });
});

module.exports = app;
