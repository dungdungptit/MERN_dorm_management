// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [students, setStudents] = useState([]);
//   const [name, setName] = useState("");
//   const [identityCard, setIdentityCard] = useState("");
//   const [studentId, setStudentId] = useState("");
//   const [monthlyRent, setMonthlyRent] = useState(0);

//   // Lấy danh sách sinh viên
//   const fetchStudents = async () => {
//     const response = await axios.get("http://localhost:5000/students");
//     setStudents(response.data);
//   };

//   // Thêm sinh viên mới
//   const addStudent = async () => {
//     const newStudent = {
//       name,
//       identity_card: identityCard,
//       monthly_rent: monthlyRent
//     };
//     const response = await axios.post("http://localhost:5000/students", newStudent);
//     fetchStudents(); // Lấy lại danh sách sinh viên sau khi thêm mới
//   };

//   // Cập nhật sinh viên
//   const updateStudent = async (id) => {
//     const updatedStudent = {
//       name,
//       identity_card: identityCard,
//       monthly_rent: monthlyRent
//     };
//     await axios.put(`http://localhost:5000/students/${id}`, updatedStudent);
//     fetchStudents(); // Lấy lại danh sách sinh viên sau khi cập nhật
//   };

//   // Xóa sinh viên
//   const deleteStudent = async (id) => {
//     await axios.delete(`http://localhost:5000/students/${id}`);
//     fetchStudents(); // Lấy lại danh sách sinh viên sau khi xóa
//   };

//   return (
//     <div className="App">
//       <h1>Quản lý sinh viên ký túc xá</h1>

//       <button onClick={fetchStudents}>Lấy danh sách sinh viên</button>
//       <h2>Danh sách sinh viên</h2>
//       <ul>
//         {students.map((student, index) => (
//           <li key={index}>
//             {student.name}: {student.identity_card}, Tiền phòng: {student.monthly_rent} VND
//             <button onClick={() => updateStudent(student._id)}>Cập nhật</button>
//             <button onClick={() => deleteStudent(student._id)}>Xóa</button>
//           </li>
//         ))}
//       </ul>

//       <h2>Thêm sinh viên mới</h2>
//       <input
//         type="text"
//         placeholder="Tên sinh viên"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="CMT"
//         value={identityCard}
//         onChange={(e) => setIdentityCard(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="Tiền phòng"
//         value={monthlyRent}
//         onChange={(e) => setMonthlyRent(e.target.value)}
//       />
//       <button onClick={addStudent}>Thêm sinh viên</button>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentManagement from './components/ManageStudents';
import NotFound from './pages/NotFound';
import Layout from './pages/Layout';
import QueryPage from './pages/QueryPage';
import ManageServices from './components/ManageServices';
import ManageGuests from './components/ManageGuests';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<HomePage />} /> */}
          <Route path="students" element={<StudentManagement />} />
          <Route path="services" element={<ManageServices />} />
          {/* <Route path="add-guest-visit" component={<AddGuestVisit />} /> */}
          {/* <Route path="add-service-usage" component={<AddServiceUsage />} /> */}
          <Route path="guests" element={<ManageGuests />} />
          <Route path="queries" element={<QueryPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
