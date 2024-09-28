import React, { useEffect, useState } from 'react';
import { getStudents, addGuestVisit } from '../api';

const AddGuestVisit = () => {
  const [students, setStudents] = useState([]);
  const [newVisit, setNewVisit] = useState({
    _id: '', // Thêm trường _id
    student_id: '',
    guest_name: '',
    guest_identity_card: '',
    guest_birth_date: '',
    visit_dates: []
  });
  const [visitDate, setVisitDate] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await getStudents();
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  const handleAddGuestVisit = async () => {
    const formattedVisitDates = newVisit.visit_dates.map(date => new Date(date));
    const guestData = {
      _id: newVisit._id, // Đảm bảo bạn truyền _id vào
      guest_name: newVisit.guest_name,
      guest_identity_card: newVisit.guest_identity_card,
      guest_birth_date: newVisit.guest_birth_date,
      student_id: newVisit.student_id,
      visit_dates: formattedVisitDates
    };

    try {
      await addGuestVisit(guestData);
      setNewVisit({
        _id: '', // Reset _id sau khi thêm
        student_id: '',
        guest_name: '',
        guest_identity_card: '',
        guest_birth_date: '',
        visit_dates: []
      });
      alert('Thêm khách thành công!');
    } catch (error) {
      console.error('Error adding guest visit:', error);
      alert('Có lỗi xảy ra khi thêm khách.');
    }
  };

  const handleAddVisitDate = () => {
    if (visitDate) {
      setNewVisit(prev => ({
        ...prev,
        visit_dates: [...prev.visit_dates, visitDate]
      }));
      setVisitDate('');
    }
  };

  return (
    <div>
      <h1>Thêm khách đến thăm</h1>
      
      <label htmlFor="guest-id">Mã khách:</label>
      <input
        id="guest-id"
        placeholder="Nhập mã khách (vd: G001)"
        value={newVisit._id}
        onChange={(e) => setNewVisit({ ...newVisit, _id: e.target.value })}
      />

      <label htmlFor="student-select">Chọn sinh viên:</label>
      <select 
        id="student-select"
        value={newVisit.student_id} 
        onChange={(e) => setNewVisit({ ...newVisit, student_id: e.target.value })}
      >
        <option value="">Chọn sinh viên</option>
        {students.map(student => (
          <option key={student._id} value={student._id}>{student.name}</option>
        ))}
      </select>

      <label htmlFor="guest-name">Tên khách:</label>
      <input
        id="guest-name"
        placeholder="Tên khách"
        value={newVisit.guest_name}
        onChange={(e) => setNewVisit({ ...newVisit, guest_name: e.target.value })}
      />

      <label htmlFor="guest-identity-card">CMT:</label>
      <input
        id="guest-identity-card"
        placeholder="CMT"
        value={newVisit.guest_identity_card}
        onChange={(e) => setNewVisit({ ...newVisit, guest_identity_card: e.target.value })}
      />

      <label htmlFor="guest-birth-date">Ngày sinh:</label>
      <input
        id="guest-birth-date"
        type="date"
        value={newVisit.guest_birth_date}
        onChange={(e) => setNewVisit({ ...newVisit, guest_birth_date: e.target.value })}
      />

      <label htmlFor="visit-date">Ngày thăm:</label>
      <input
        id="visit-date"
        type="date"
        value={visitDate}
        onChange={(e) => setVisitDate(e.target.value)}
      />
      <button onClick={handleAddVisitDate}>Thêm ngày thăm</button>

      <button onClick={handleAddGuestVisit}>Thêm khách</button>
      
      <h3>Ngày thăm đã thêm:</h3>
      <ul>
        {newVisit.visit_dates.map((date, index) => (
          <li key={index}>{new Date(date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddGuestVisit;
