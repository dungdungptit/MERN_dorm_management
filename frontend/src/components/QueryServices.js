import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueryServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await axios.get('/query/services?startDate=2023-09-01&endDate=2023-09-30');
      setServices(response.data);
    };
    fetchServices();
  }, []);

  return (
    <div>
      <h1>Danh sách dịch vụ đã sử dụng</h1>
      <table>
        <thead>
          <tr>
            <th>Tên sinh viên</th>
            <th>Tên dịch vụ</th>
            <th>Tổng chi phí</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.studentName}</td>
              <td>{service.serviceName}</td>
              <td>{service.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryServices;
