/** @format */

require("dotenv").config();
const mongoose = require("mongoose");

const mongodb = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connected to Database"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));
};

module.exports = { mongodb };
