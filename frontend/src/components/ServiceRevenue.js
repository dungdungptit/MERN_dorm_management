import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServicesRevenue = () => {
  const [totalServices, setTotalServices] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Hàm gọi API để lấy dữ liệu
  const fetchTotalServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quries/services_costs", {
        params: {
          start_date: startDate,
          end_date: endDate
        }
      });
      setTotalServices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchTotalServices();
  }, []);

  // Hàm làm mới dữ liệu
  const handleRefresh = () => {
    fetchTotalServices();
  };

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Hàm xử lý khi nhấn nút gọi API
  const handleFetchData = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    fetchTotalServices();
  };

  return (
    <div>
      <h1>Doanh thu dịch vụ trong KTX</h1>

      {/* Form để nhập start_date và end_date */}
      <form onSubmit={handleFetchData}>
        <label>
          Ngày bắt đầu:
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
            required 
          />
        </label>
        <label>
          Ngày kết thúc:
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Lấy dữ liệu</button>
      </form>

      <button onClick={handleRefresh}>Làm mới</button>

      <table>
        <thead>
          <tr>
            <th>Tên dịch vụ</th>
            <th>Tổng doanh thu</th>
            <th>Doanh thu theo tháng</th>
          </tr>
        </thead>
        <tbody>
          {totalServices.map((service) => (
            <tr key={service.service_name}>
              <td>{service.service_name}</td>
              <td>{service.total_revenue.toLocaleString()} VNĐ</td>
              <td>
                {Object.entries(service.monthly_revenue).map(([month, revenue]) => (
                  <div key={month}>
                    {formatDate(`${month}-01`)}: {revenue.toLocaleString()} VNĐ
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesRevenue;
