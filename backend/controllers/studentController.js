// controllers/studentController.js
const Student = require("../models/Student");

// Lấy danh sách sinh viên
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm sinh viên mới
exports.createStudent = async (req, res) => {
  const student = new Student(req.body);
  try {
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật thông tin sinh viên
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ message: "Sinh viên không tồn tại." });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa sinh viên
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: "Sinh viên không tồn tại." });
    res.json({ message: "Sinh viên đã bị xóa." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
