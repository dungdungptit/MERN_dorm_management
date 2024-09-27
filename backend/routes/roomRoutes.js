// routes/roomRoutes.js
const express = require("express");
const router = express.Router();
const {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

// Lấy danh sách phòng
router.get("/", getRooms);

// Thêm phòng mới
router.post("/", createRoom);

// Cập nhật thông tin phòng
router.put("/:id", updateRoom);

// Xóa phòng
router.delete("/:id", deleteRoom);

module.exports = router;
