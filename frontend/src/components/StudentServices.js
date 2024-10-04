import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const ServicesPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [students, setStudents] = useState([]);

  // Gọi API để lấy thông tin dịch vụ của sinh viên
  const fetchServiceStudents = async () => {
    try {
      // Gọi API với start_date và end_date
      const response = await axios.get('http://localhost:5000/api/quries/services', {
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });
      setStudents(response.data);
    } catch (err) {
      console.error('Lỗi khi gọi API:', err);
    }
  };

  return (
    <div>
      <h1>Thông tin dịch vụ sinh viên</h1>

      {/* Chọn ngày bắt đầu và kết thúc */}
      <div>
        <label htmlFor="startDate">Ngày bắt đầu:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="endDate">Ngày kết thúc:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* Nút lấy dịch vụ */}
        <button onClick={fetchServiceStudents}>Lấy dịch vụ</button>
      </div>

      {/* Hiển thị danh sách sinh viên và dịch vụ họ đã sử dụng */}
      <div>
        {students.length > 0 ? (
          <table border="1">
            <thead>
              <tr>
                <th>Tên sinh viên</th>
                <th>Tên dịch vụ</th>
                <th>Tổng chi phí</th>
                <th>Thời gian bắt đầu</th>
                <th>Thời gian kết thúc</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <React.Fragment key={index}>
                  {student.services.length > 0 ? (
                    student.services.map((service, idx) => (
                      <tr key={idx}>
                        {idx === 0 && (
                          <td rowSpan={student.services.length}>
                            {student.name}
                          </td>
                        )}
                        <td>{service.service_name}</td>
                        <td>{service.total_cost.toLocaleString('vi-VN')} VND</td>
                        <td>{moment(service.start_date).format('DD/MM/YYYY')}</td>
                        <td>{moment(service.end_date).format('DD/MM/YYYY')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>{student.name}</td>
                      <td colSpan="4">Không có dịch vụ</td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có dữ liệu.</p>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
