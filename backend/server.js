// server.js
const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const guestRoutes = require("./routes/guestRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const roomRoutes = require("./routes/roomRoutes");
const parkingRoutes = require("./routes/parkingRoutes");
const queryRoutes = require("./routes/queryRoutes");

const app = express();
const cors = require("cors");

// Kết nối đến MongoDB
connectDB();

// Middleware
app.use(express.json()); // Phân tích JSON từ body của request
app.use(cors());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/quries", queryRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
