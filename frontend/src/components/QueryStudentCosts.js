import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueryStudentCosts = () => {
  const [studentCosts, setStudentCosts] = useState([]);

  useEffect(() => {
    const fetchStudentCosts = async () => {
      const response = await axios.get('/query/student-costs');
      setStudentCosts(response.data);
    };
    fetchStudentCosts();
  }, []);

  return (
    <div>
      <h1>Tổng chi phí của sinh viên</h1>
      <table>
        <thead>
          <tr>
            <th>Tên sinh viên</th>
            <th>Tiền phòng</th>
            <th>Tiền dịch vụ</th>
            <th>Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {studentCosts.map((cost, index) => (
            <tr key={index}>
              <td>{cost.studentName}</td>
              <td>{cost.roomCost}</td>
              <td>{cost.serviceCost}</td>
              <td>{cost.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryStudentCosts;
