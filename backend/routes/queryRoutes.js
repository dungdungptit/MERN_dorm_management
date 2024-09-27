// routes/queryRoutes.js
const express = require("express");
const router = express.Router();
const {
  getStudentCosts,
  getServicesByDate,
  getGuestVisits,
} = require("../controllers/queryController");

// Truy vấn chi phí sinh viên
router.get("/total", getStudentCosts);

// Truy vấn dịch vụ đã sử dụng theo thời gian
router.get("/services", getServicesByDate);

// Truy vấn khách đến thăm sinh viên
router.get("/guests", getGuestVisits);

module.exports = router;
