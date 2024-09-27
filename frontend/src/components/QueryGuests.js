import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueryGuests = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const fetchGuests = async () => {
      const response = await axios.get('/query/guests?startDate=2023-09-01&endDate=2023-09-30');
      setGuests(response.data);
    };
    fetchGuests();
  }, []);

  return (
    <div>
      <h1>Thông tin khách đến thăm</h1>
      <table>
        <thead>
          <tr>
            <th>Tên sinh viên</th>
            <th>Khách đến thăm</th>
            <th>Số lần thăm</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, index) => (
            <tr key={index}>
              <td>{guest.studentName}</td>
              <td>{guest.guests.map(g => g.guestName).join(', ')}</td>
              <td>{guest.visitCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryGuests;
