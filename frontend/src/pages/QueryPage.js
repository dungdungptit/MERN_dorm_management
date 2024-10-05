import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentCosts from '../components/StudentCosts';
import StudentServices from '../components/StudentServices';
import GuestsInfo from '../components/GuestsInfo';
import ServiceRevenue from '../components/ServiceRevenue';

const QueryPage = () => {

  // Lấy thông tin sinh viên và khách đến thăm
  const fetchGuestsStudents = async () => {
    const response = await axios.get("http://localhost:5000/api/quries/services_costs");
    
  };

  return (
    <div className="App">
      <h1>Quản lý ký túc xá</h1>
      <StudentCosts />

      <StudentServices />

      <GuestsInfo />

      <ServiceRevenue />
      {/* <button onClick={fetchGuestsStudents}>test</button> */}
      
    </div>
  );
}

export default QueryPage;
