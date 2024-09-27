const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Kết nối với MongoDB
mongoose.connect("mongodb://localhost:27017/dorm_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model sinh viên
const Student = mongoose.model("Student", new mongoose.Schema({
  name: String,
  identity_card: String,
  birth_date: Date,
  class: String,
  hometown: String,
  room_id: String,
  monthly_rent: Number,
  services_used: Array,
  guests: Array,
  total_amount_due: Number
}));

// Lấy danh sách sinh viên và tổng tiền phải trả
app.get("/students/total", async (req, res) => {
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
});

// Lấy thông tin sinh viên và tổng giá dịch vụ
app.get("/students/services", async (req, res) => {
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
});

// Lấy thông tin sinh viên và khách đến thăm
app.get("/students/guests", async (req, res) => {
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
});
  
// Đưa các route vào

app.use(require("./routes/studentRoutes"));
// app.use(require("./routes/services"));
// app.use(require("./routes/guests"));
// app.use(require("./routes/queries"));


// Khởi động server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
