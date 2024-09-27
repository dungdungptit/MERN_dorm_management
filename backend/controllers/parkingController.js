// controllers/parkingController.js
const Parking = require("../models/Parking");

// Lấy danh sách bãi đỗ xe
exports.getParkingEntries = async (req, res) => {
  try {
    const parkingEntries = await Parking.find();
    res.json(parkingEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm bãi đỗ xe mới
exports.createParkingEntry = async (req, res) => {
  const parkingEntry = new Parking(req.body);
  try {
    const savedParking = await parkingEntry.save();
    res.status(201).json(savedParking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật thông tin bãi đỗ xe
exports.updateParkingEntry = async (req, res) => {
  try {
    const updatedParking = await Parking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedParking) return res.status(404).json({ message: "Bãi đỗ xe không tồn tại." });
    res.json(updatedParking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa bãi đỗ xe
exports.deleteParkingEntry = async (req, res) => {
  try {
    const deletedParking = await Parking.findByIdAndDelete(req.params.id);
    if (!deletedParking) return res.status(404).json({ message: "Bãi đỗ xe không tồn tại." });
    res.json({ message: "Bãi đỗ xe đã bị xóa." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
