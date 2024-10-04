import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const GuestsInfo = () => {
  // State để lưu thông tin sinh viên và khách đến thăm
  const [guestsData, setGuestsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Hàm để lấy thông tin khách đến thăm
  const fetchGuestsStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quries/guests", {
        params: {
          start_date: startDate ? startDate : undefined,
          end_date: endDate ? endDate : undefined,
        },
      });
      setGuestsData(response.data);
    } catch (err) {
      console.error("Error fetching guests data:", err);
    }
  };

  // Hàm format ngày hiển thị
  const formatDate = (date) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  return (
    <div>
      <h1>Thông tin sinh viên và khách đến thăm</h1>

      {/* Inputs để nhập ngày bắt đầu và kết thúc */}
      <div>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Nút để lấy thông tin khách đến thăm */}
      <button onClick={fetchGuestsStudents}>Lấy thông tin khách đến thăm</button>

      {/* Hiển thị thông tin sinh viên và khách đến thăm dưới dạng bảng */}
      {guestsData.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Sinh viên</th>
              <th>Tên khách</th>
              <th>Số chứng minh thư khách</th>
              <th>Số lần đến thăm</th>
              <th>Ngày đến thăm</th>
            </tr>
          </thead>
          <tbody>
            {guestsData.map((student, index) => (
              <React.Fragment key={index}>
                {/* Mỗi khách có thể có nhiều ngày đến thăm */}
                <tr>
                  <td>{student.student_name}</td>
                  <td>{student.guest_name}</td>
                  <td>{student.guest_identity_card}</td>
                  <td>{student.visit_count}</td>
                  <td>
                    {student.visit_dates.map((date, dIndex) => (
                      <p key={dIndex}>{formatDate(date)}</p>
                    ))}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Chưa có dữ liệu.</p>
      )}
    </div>
  );
};

export default GuestsInfo;
