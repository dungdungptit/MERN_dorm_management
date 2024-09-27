import React, { useEffect, useState } from 'react';
import { getStudents, addGuestVisit } from '../api';

const AddGuestVisit = () => {
  const [students, setStudents] = useState([]);
  const [newVisit, setNewVisit] = useState({
    student_id: '',
    guest_name: '',
    guest_identity_card: '',
    guest_birth_date: '',
    visit_dates: []
  });

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await getStudents();
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  const handleAddGuestVisit = async () => {
    await addGuestVisit(newVisit);
    setNewVisit({
      student_id: '',
      guest_name: '',
      guest_identity_card: '',
      guest_birth_date: '',
      visit_dates: []
    });
    alert('Thêm khách thành công!');
  };

  return (
    <div>
      <h1>Thêm khách đến thăm</h1>
      <select 
        value={newVisit.student_id} 
        onChange={(e) => setNewVisit({ ...newVisit, student_id: e.target.value })}
      >
        <option value="">Chọn sinh viên</option>
        {students.map(student => (
          <option key={student._id} value={student._id}>{student.name}</option>
        ))}
      </select>
      <input
        placeholder="Tên khách"
        value={newVisit.guest_name}
        onChange={(e) => setNewVisit({ ...newVisit, guest_name: e.target.value })}
      />
      <input
        placeholder="CMT"
        value={newVisit.guest_identity_card}
        onChange={(e) => setNewVisit({ ...newVisit, guest_identity_card: e.target.value })}
      />
      <input
        type="date"
        value={newVisit.guest_birth_date}
        onChange={(e) => setNewVisit({ ...newVisit, guest_birth_date: e.target.value })}
      />
      <input
        type="date"
        placeholder="Ngày thăm"
        onChange={(e) => setNewVisit({ ...newVisit, visit_dates: [...newVisit.visit_dates, e.target.value] })}
      />
      <button onClick={handleAddGuestVisit}>Thêm khách</button>
    </div>
  );
};

export default AddGuestVisit;
