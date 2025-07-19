/** @format */

// index.js
require("dotenv").config();

const app = require("./app"); // Import the app with routes/middleware

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("|");
  console.log("|");
  console.log(`| 🚀 Server is running on port ${PORT}`);
});
