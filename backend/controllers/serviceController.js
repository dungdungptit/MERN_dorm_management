// controllers/serviceController.js
const Service = require("../models/Service");

// Lấy danh sách dịch vụ
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm dịch vụ mới
exports.createService = async (req, res) => {
  const service = new Service(req.body);
  try {
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật thông tin dịch vụ
exports.updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) return res.status(404).json({ message: "Dịch vụ không tồn tại." });
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa dịch vụ
exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: "Dịch vụ không tồn tại." });
    res.json({ message: "Dịch vụ đã bị xóa." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
