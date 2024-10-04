import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentCosts = () => {
  const [totalStudents, setTotalStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy thông tin sinh viên và tổng tiền phải trả
  const fetchTotalStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/quries/total");
      setTotalStudents(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
    setLoading(false);
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchTotalStudents();
  }, []);

  return (
    <div>
      <h2>Danh sách sinh viên và tổng tiền phải trả</h2>
      <button onClick={fetchTotalStudents}>Làm mới</button>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Tên sinh viên</th>
              <th>Giá phòng</th>
              <th>Dịch vụ</th>
              <th>Tổng tiền phải trả</th>
            </tr>
          </thead>
          <tbody>
            {totalStudents.length > 0 ? (
              totalStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.room_cost}</td>
                  <td>
                    {student.services.length > 0 ? (
                      <ul>
                        {student.services.map((service, idx) => (
                          <li key={idx}>
                            {service.service_name}: {service.total_cost} VND
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Không có dịch vụ</p>
                    )}
                  </td>
                  <td>{student.total_cost} VND</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentCosts;
