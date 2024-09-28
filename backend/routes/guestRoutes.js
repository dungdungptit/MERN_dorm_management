// routes/guestRoutes.js
const express = require("express");
const router = express.Router();
const {
  getGuests,
  createGuest,
  updateGuest,
  deleteGuest,
} = require("../controllers/guestController");
const Guest = require('../models/Guest');
const Student = require('../models/Student');

// Lấy danh sách khách
router.get("/", getGuests);

// Thêm khách mới
router.post("/", createGuest);

// Cập nhật thông tin khách
router.put("/:id", updateGuest);

// Xóa khách
router.delete("/:id", deleteGuest);

// Thêm khách đến thăm
router.post('/visit', async (req, res) => {
  const { _id, guest_name, guest_identity_card, guest_birth_date, student_id, visit_dates } = req.body;

    const guest = {
        _id: _id, // Đảm bảo bạn truyền _id vào
        name: guest_name,
        identity_card: guest_identity_card,
        birth_date: new Date(guest_birth_date),
        visits: [{
            student_id: student_id,
            visit_dates: visit_dates.map(date => new Date(date)) // Chuyển đổi ngày
        }]
    };

    try {
        const newGuest = await Guest.create(guest);
        res.status(201).json(newGuest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
