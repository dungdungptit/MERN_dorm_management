// routes/parkingRoutes.js
const express = require("express");
const router = express.Router();
const {
  getParkingEntries,
  createParkingEntry,
  updateParkingEntry,
  deleteParkingEntry,
} = require("../controllers/parkingController");

// Lấy danh sách bãi đỗ xe
router.get("/", getParkingEntries);

// Thêm bãi đỗ xe mới
router.post("/", createParkingEntry);

// Cập nhật thông tin bãi đỗ xe
router.put("/:id", updateParkingEntry);

// Xóa bãi đỗ xe
router.delete("/:id", deleteParkingEntry);

module.exports = router;
