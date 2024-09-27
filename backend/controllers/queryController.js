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
  const students = await Student.aggregate([
    {
      $unwind: "$guests"
    },
    {
      $group: {
        _id: "$name",
        guests: {
          $push: {
            guest_name: "$guests.name",
            visit_count: "$guests.visit_count",
            visit_dates: "$guests.visit_dates"
          }
        }
      }
    }
  ]);
  res.json(students);
};
