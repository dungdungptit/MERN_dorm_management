// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Lấy danh sách sinh viên
router.get("/", getStudents);

// Thêm sinh viên mới
router.post("/", createStudent);

// Cập nhật thông tin sinh viên
router.put("/:id", updateStudent);

// Xóa sinh viên
router.delete("/:id", deleteStudent);

module.exports = router;
