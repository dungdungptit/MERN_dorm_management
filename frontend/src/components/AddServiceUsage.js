import React, { useEffect, useState } from 'react';
import { getStudents, getServices, addServiceUsage } from '../api';

const AddServiceUsage = () => {
  const [students, setStudents] = useState([]);
  const [services, setServices] = useState([]);
  const [newServiceUsage, setNewServiceUsage] = useState({
    student_id: '',
    service_id: '',
    times_used: 1
  });

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await getStudents();
      setStudents(response.data);
    };
    const fetchServices = async () => {
      const response = await getServices();
      setServices(response.data);
    };
    fetchStudents();
    fetchServices();
  }, []);

  const handleAddServiceUsage = async () => {
    await addServiceUsage(newServiceUsage);
    setNewServiceUsage({
      student_id: '',
      service_id: '',
      times_used: 1
    });
    alert('Thêm dịch vụ thành công!');
  };

  return (
    <div>
      <h1>Thêm dịch vụ sử dụng</h1>
      <select 
        value={newServiceUsage.student_id} 
        onChange={(e) => setNewServiceUsage({ ...newServiceUsage, student_id: e.target.value })}
      >
        <option value="">Chọn sinh viên</option>
        {students.map(student => (
          <option key={student._id} value={student._id}>{student.name}</option>
        ))}
      </select>
      <select 
        value={newServiceUsage.service_id} 
        onChange={(e) => setNewServiceUsage({ ...newServiceUsage, service_id: e.target.value })}
      >
        <option value="">Chọn dịch vụ</option>
        {services.map(service => (
          <option key={service._id} value={service._id}>{service.service_name}</option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        value={newServiceUsage.times_used}
        onChange={(e) => setNewServiceUsage({ ...newServiceUsage, times_used: e.target.value })}
      />
      <button onClick={handleAddServiceUsage}>Thêm dịch vụ</button>
    </div>
  );
};

export default AddServiceUsage;
