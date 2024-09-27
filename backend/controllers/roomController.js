// controllers/roomController.js
const Room = require("../models/Room");

// Lấy danh sách phòng
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm phòng mới
exports.createRoom = async (req, res) => {
  const room = new Room(req.body);
  try {
    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật thông tin phòng
exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) return res.status(404).json({ message: "Phòng không tồn tại." });
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa phòng
exports.deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: "Phòng không tồn tại." });
    res.json({ message: "Phòng đã bị xóa." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
