// routes/queryRoutes.js
const express = require("express");
const router = express.Router();
const {
  getStudentCosts,
  getServicesByDate,
  getGuestVisits,
  getServicesCost
} = require("../controllers/queryController");

// Truy vấn chi phí sinh viên
router.get("/total", getStudentCosts);

// Truy vấn dịch vụ đã sử dụng theo thời gian
router.get("/services", getServicesByDate);

// Truy vấn khách đến thăm sinh viên
router.get("/guests", getGuestVisits);

// Liệt kê danh mục các dịch vụ cùng doanh thu của mỗi dịch vụ trong KTX trong mỗi tháng.
router.get("/services_costs", getServicesCost);

module.exports = router;
