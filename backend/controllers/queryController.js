// controllers/queryController.js
const Student = require("../models/Student");
const Guest = require("../models/Guest");

// Truy vấn chi phí sinh viên
exports.getStudentCosts = async (req, res) => {
  const students = await Student.aggregate([
    {
      $addFields: {
        total_amount_due: {
          $add: [
            "$monthly_rent",
            { $sum: "$services_used.total_cost" }
          ]
        }
      }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        total_amount_due: 1
      }
    }
  ]);
  res.json(students);
};

// Truy vấn dịch vụ đã sử dụng theo thời gian
exports.getServicesByDate = async (req, res) => {
  const { startDate, endDate } = req.query;

  const students = await Student.aggregate([
    {
      $unwind: "$services_used"
    },
    {
      $match: {
        "services_used.start_date": { $gte: new Date(startDate) },
        "services_used.end_date": { $lte: new Date(endDate) }
      }
    },
    {
      $group: {
        _id: "$name",
        services: {
          $push: {
            service_name: "$services_used.service_name",
            total_cost: "$services_used.total_cost"
          }
        }
      }
    }
  ]);
  res.json(students);
};

// Truy vấn khách đến thăm sinh viên
exports.getGuestVisits = async (req, res) => {
  const { startDate, endDate } = req.query; // Nhận tham số từ query

  try {
    const students = await Student.find({});
    
    const result = students.map(student => {
      const guests = student.guests.filter(guest => 
        guest.visit_dates.some(date => {
          const visitDate = new Date(date);
          return visitDate >= new Date(startDate) && visitDate <= new Date(endDate);
        })
      );

      return {
        student_id: student._id,
        name: student.name,
        guests: guests.map(guest => ({
          guest_id: guest.guest_id,
          guest_name: guest.name,
          visit_count: guest.visit_dates.filter(date => {
            const visitDate = new Date(date);
            return visitDate >= new Date(startDate) && visitDate <= new Date(endDate);
          }).length,
          visit_dates: guest.visit_dates.filter(date => {
            const visitDate = new Date(date);
            return visitDate >= new Date(startDate) && visitDate <= new Date(endDate);
          })
        }))
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
