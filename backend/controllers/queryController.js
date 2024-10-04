// controllers/queryController.js
const Student = require("../models/Student");
const Guest = require("../models/Guest");

// Truy vấn chi phí sinh viên
exports.getStudentCosts = async (req, res) => {
  try {
    const students = await Student.find().populate('room_id').populate('services_used.service_id');
    const result = students.map(student => ({
      name: student.name,
      room: student.room_id.room_type,
      room_cost: student.monthly_rent,
      services: student.services_used.map(service => ({
        service_name: service.service_name,
        total_cost: service.total_cost
      })),
      total_cost: student.total_amount_due
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Truy vấn dịch vụ đã sử dụng theo thời gian
exports.getServicesByDate = async (req, res) => {
 
  const { start_date, end_date } = req.query;

  // Điều kiện lọc dựa trên ngày tháng
  let filter = {};

  // Nếu có truyền start_date và end_date thì thêm vào bộ lọc
  if (start_date && end_date) {
    filter = {
      "services_used.start_date": { $gte: new Date(start_date) },
      "services_used.end_date": { $lte: new Date(end_date) }
    };
  }

  try {
    // Tìm tất cả các sinh viên, với điều kiện lọc dịch vụ theo ngày nếu có
    const students = await Student.find(filter);
    
    const result = students.map(student => ({
      name: student.name,
      services: student.services_used.map(service => ({
        service_name: service.service_name,
        total_cost: service.total_cost,
        start_date: service.start_date,
        end_date: service.end_date
      }))
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

// Truy vấn khách đến thăm sinh viên
exports.getGuestVisits = async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    // Tìm tất cả khách
    const guests = await Guest.find();

    // Lưu trữ kết quả
    const results = [];

    // Duyệt qua từng khách
    for (const guest of guests) {
      // Duyệt qua từng visit của khách
      for (const visit of guest.visits) {
        const visitDates = visit.visit_dates;

        // Nếu có start_date và end_date, lọc các ngày thăm trong khoảng thời gian
        const filteredDates = start_date && end_date
          ? visitDates.filter(date => date >= new Date(start_date) && date <= new Date(end_date))
          : visitDates;

        // Nếu có ngày thăm hợp lệ
        if (filteredDates.length > 0) {
          // Tìm thông tin sinh viên dựa trên student_id
          const student = await Student.findById(visit.student_id);

          // Nếu sinh viên tồn tại, thêm vào kết quả
          if (student) {
            results.push({
              student_id: student._id,
              student_name: student.name,
              guest_name: guest.name,
              guest_identity_card: guest.identity_card,
              visit_count: filteredDates.length,
              visit_dates: filteredDates
            });
          }
        }
      }
    }

    // Trả về kết quả
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Liệt kê danh mục các dịch vụ cùng doanh thu của mỗi dịch vụ trong KTX trong mỗi tháng.
exports.getServicesCost = async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const students = await Student.find();
    const revenueByService = {};

    students.forEach(student => {
      student.services_used.forEach(service => {
        const serviceId = service.service_id; // Mã dịch vụ
        const serviceName = service.service_name; // Tên dịch vụ
        const totalCost = service.total_cost; // Tổng chi phí cho dịch vụ
        const startDate = new Date(service.start_date);
        const endDate = new Date(service.end_date);

        // Nếu không có start_date và end_date, hoặc dịch vụ nằm trong khoảng thời gian cho phép
        if (!start_date && !end_date ||
            (startDate >= new Date(start_date) && endDate <= new Date(end_date))) {
          const monthYear = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}`;

          // Khởi tạo doanh thu cho dịch vụ nếu chưa có
          if (!revenueByService[serviceName]) {
            revenueByService[serviceName] = {
              service_name: serviceName,
              total_revenue: 0,
              monthly_revenue: {}
            };
          }

          // Cập nhật doanh thu tổng và doanh thu theo tháng
          revenueByService[serviceName].total_revenue += totalCost;

          if (!revenueByService[serviceName].monthly_revenue[monthYear]) {
            revenueByService[serviceName].monthly_revenue[monthYear] = 0;
          }
          revenueByService[serviceName].monthly_revenue[monthYear] += totalCost;
        }
      });
    });

    // Chuyển đổi kết quả về dạng mảng
    const result = Object.values(revenueByService);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
