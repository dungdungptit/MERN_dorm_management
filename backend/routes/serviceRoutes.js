// routes/serviceRoutes.js
const express = require("express");
const router = express.Router();
const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

// Lấy danh sách dịch vụ
router.get("/", getServices);

// Thêm dịch vụ mới
router.post("/", createService);

// Cập nhật thông tin dịch vụ
router.put("/:id", updateService);

// Xóa dịch vụ
router.delete("/:id", deleteService);

const Service = require('../models/Service');
const Student = require('../models/Student');

// Thêm dịch vụ sử dụng
router.post('/use', async (req, res) => {
    const { student_id, service_id, times_used } = req.body;

    try {
        const service = await Service.findById(service_id);
        
        // Cập nhật thông tin dịch vụ cho sinh viên
        await Student.updateOne(
            { _id: student_id },
            {
                $push: {
                    services_used: {
                        service_id,
                        service_name: service.service_name,
                        times_used,
                        total_cost: service.price * times_used,
                        start_date: new Date(),
                        end_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
                    }
                }
            }
        );

        res.status(201).json({ message: 'Thêm dịch vụ thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
