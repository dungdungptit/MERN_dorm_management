import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueryPage = () => {
  const [totalStudents, setTotalStudents] = useState([]);
  const [serviceStudents, setServiceStudents] = useState([]);
  const [guestsStudents, setGuestsStudents] = useState([]);
  const [startDateServices, setStartDateServices] = useState("");
  const [endDateServices, setEndDateServices] = useState("");
  const [startDateGuests, setStartDateGuests] = useState("");
  const [endDateGuests, setEndDateGuests] = useState("");

  // Lấy thông tin sinh viên và tổng tiền phải trả
  const fetchTotalStudents = async () => {
    const response = await axios.get("http://localhost:5000/api/quries/total");
    setTotalStudents(response.data);
  };

  // Lấy thông tin sinh viên và dịch vụ họ đã sử dụng
  const fetchServiceStudents = async () => {
    const response = await axios.get("http://localhost:5000/api/quries/services", {
      params: { startDate: startDateServices, endDate: endDateServices }
    });
    setServiceStudents(response.data);
  };

  // Lấy thông tin sinh viên và khách đến thăm
  const fetchGuestsStudents = async () => {
    const response = await axios.get("http://localhost:5000/api/quries/guests", {
      params: { startDate: startDateGuests, endDate: endDateGuests }
    });
    setGuestsStudents(response.data);
  };

  return (
    <div className="App">
      <h1>Quản lý ký túc xá</h1>

      <button onClick={fetchTotalStudents}>Lấy tổng tiền phải trả</button>
      <h2>Sinh viên và tổng tiền phải trả</h2>
      <ul>
        {totalStudents.map((student, index) => (
          <li key={index}>{student.name}: {student.total_amount_due} VND</li>
        ))}
      </ul>

      <h2>Sinh viên và dịch vụ đã sử dụng</h2>
      <input
        type="date"
        value={startDateServices}
        onChange={(e) => setStartDateServices(e.target.value)}
        placeholder="Ngày bắt đầu"
      />
      <input
        type="date"
        value={endDateServices}
        onChange={(e) => setEndDateServices(e.target.value)}
        placeholder="Ngày kết thúc"
      />
      <button onClick={fetchServiceStudents}>Lấy dịch vụ</button>
      <ul>
        {serviceStudents.map((student, index) => (
          <li key={index}>
            {student._id}
            <ul>
              {student.services.map((service, idx) => (
                <li key={idx}>
                  {service.service_name}: {service.total_cost} VND
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h2>Sinh viên và khách đến thăm</h2>
      <input
        type="date"
        value={startDateGuests}
        onChange={(e) => setStartDateGuests(e.target.value)}
        placeholder="Ngày bắt đầu"
      />
      <input
        type="date"
        value={endDateGuests}
        onChange={(e) => setEndDateGuests(e.target.value)}
        placeholder="Ngày kết thúc"
      />
      <button onClick={fetchGuestsStudents}>Lấy thông tin khách đến thăm</button>
      <ul>
        {guestsStudents.map((student, index) => (
          <li key={index}>
            {student.student_id} - {student.name}
            <ul>
              {student.guests.map((guest, idx) => (
                <li key={idx}>
                  {guest.guest_name}, Số lần thăm: {guest.visit_count}, Ngày thăm: {guest.visit_dates.join(", ")}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QueryPage;
