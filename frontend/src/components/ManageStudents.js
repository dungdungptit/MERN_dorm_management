import React, { useEffect, useState } from 'react';
import { getStudents, createStudent, deleteStudent } from '../api';
import AddGuestVisit from './AddGuestVisit';
import AddServiceUsage from './AddServiceUsage';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    _id: '',
    name: '',
    identity_card: '',
    birth_date: '',
    class: '',
    hometown: '',
    room_id: '',
    monthly_rent: 0,
    services_used: [],
    guests: [],
    monthly_parking_ticket: {
      vehicles: [],
    },
    total_amount_due: 0,
  });

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await getStudents();
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    await createStudent(newStudent);
    setStudents([...students, newStudent]);
    setNewStudent({
      _id: '',
      name: '',
      identity_card: '',
      birth_date: '',
      class: '',
      hometown: '',
      room_id: '',
      monthly_rent: 0,
      services_used: [],
      guests: [],
      monthly_parking_ticket: {
        vehicles: [],
      },
      total_amount_due: 0,
    });
    alert('Thêm sinh viên thành công!');
  };

  const handleDeleteStudent = async (id) => {
    await deleteStudent(id);
    setStudents(students.filter(student => student._id !== id));
    alert('Xóa sinh viên thành công!');
  };

  return (
    <div>
      <h1>Quản lý sinh viên</h1>

      <h2>Thêm sinh viên</h2>
      <input
        placeholder="Mã sinh viên"
        value={newStudent._id}
        onChange={(e) => setNewStudent({ ...newStudent, _id: e.target.value })}
      />
      <input
        placeholder="Tên sinh viên"
        value={newStudent.name}
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
      />
      <input
        placeholder="Số CMT/CCCD"
        value={newStudent.identity_card}
        onChange={(e) => setNewStudent({ ...newStudent, identity_card: e.target.value })}
      />
      <input
        type="date"
        placeholder="Ngày sinh"
        value={newStudent.birth_date}
        onChange={(e) => setNewStudent({ ...newStudent, birth_date: e.target.value })}
      />
      <input
        placeholder="Lớp học"
        value={newStudent.class}
        onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
      />
      <input
        placeholder="Quê quán"
        value={newStudent.hometown}
        onChange={(e) => setNewStudent({ ...newStudent, hometown: e.target.value })}
      />
      <input
        placeholder="Mã phòng"
        value={newStudent.room_id}
        onChange={(e) => setNewStudent({ ...newStudent, room_id: e.target.value })}
      />
      <input
        type="number"
        placeholder="Giá phòng hàng tháng"
        value={newStudent.monthly_rent}
        onChange={(e) => setNewStudent({ ...newStudent, monthly_rent: e.target.value })}
      />
      <input
        type="number"
        placeholder="Tổng số tiền phải trả"
        value={newStudent.total_amount_due}
        onChange={(e) => setNewStudent({ ...newStudent, total_amount_due: e.target.value })}
      />
      <button onClick={handleAddStudent}>Thêm sinh viên</button>

      <h2>Danh sách sinh viên</h2>
      <table>
        <thead>
          <tr>
            <th>Mã sinh viên</th>
            <th>Tên</th>
            <th>Số CMT/CCCD</th>
            <th>Ngày sinh</th>
            <th>Lớp học</th>
            <th>Quê quán</th>
            <th>Mã phòng</th>
            <th>Giá phòng</th>
            <th>Tổng tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student._id}</td>
              <td>{student.name}</td>
              <td>{student.identity_card}</td>
              <td>{new Date(student.birth_date).toLocaleDateString()}</td>
              <td>{student.class}</td>
              <td>{student.hometown}</td>
              <td>{student.room_id}</td>
              <td>{student.monthly_rent}</td>
              <td>{student.total_amount_due}</td>
              <td>
                <button onClick={() => handleDeleteStudent(student._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <AddGuestVisit />
      <br />
      <AddServiceUsage />
    </div>
  );
};

export default ManageStudents;

