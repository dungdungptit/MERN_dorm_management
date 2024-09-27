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
  const { student_id, guest_name, guest_identity_card, guest_birth_date, visit_dates } = req.body;

  try {
      // Tạo khách mới
      const newGuest = {
          name: guest_name,
          identity_card: guest_identity_card,
          birth_date: guest_birth_date,
          visits: [{ student_id, visit_dates }]
      };

      const guest = await Guest.create(newGuest);

      // Cập nhật danh sách khách của sinh viên
      await Student.updateOne(
          { _id: student_id },
          { $push: { guests: { guest_id: guest._id, name: guest_name, identity_card: guest_identity_card, birth_date: guest_birth_date, visit_dates } } }
      );

      res.status(201).json(guest);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
