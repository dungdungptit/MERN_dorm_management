// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Thay đổi đường dẫn nếu cần

// -----------------------------------
// API cho khách
// -----------------------------------
export const getGuests = async () => {
    return await axios.get(`${API_URL}/guests`);
};

export const createGuest = async (guest) => {
    return await axios.post(`${API_URL}/guests`, guest);
};

export const deleteGuest = async (id) => {
    return await axios.delete(`${API_URL}/guests/${id}`);
};

// -----------------------------------
// API cho bãi đỗ xe
// -----------------------------------
export const getParkingEntries = async () => {
    return await axios.get(`${API_URL}/parking`);
};

export const createParkingEntry = async (entry) => {
    return await axios.post(`${API_URL}/parking`, entry);
};

export const deleteParkingEntry = async (id) => {
    return await axios.delete(`${API_URL}/parking/${id}`);
};

// -----------------------------------
// API cho phòng
// -----------------------------------
export const getRooms = async () => {
    return await axios.get(`${API_URL}/rooms`);
};

export const createRoom = async (room) => {
    return await axios.post(`${API_URL}/rooms`, room);
};

export const deleteRoom = async (id) => {
    return await axios.delete(`${API_URL}/rooms/${id}`);
};

// -----------------------------------
// API cho dịch vụ
// -----------------------------------
export const getServices = async () => {
    return await axios.get(`${API_URL}/services`);
};

export const createService = async (service) => {
    return await axios.post(`${API_URL}/services`, service);
};

export const deleteService = async (id) => {
    return await axios.delete(`${API_URL}/services/${id}`);
};

// -----------------------------------
// API cho sinh viên
// -----------------------------------
export const getStudents = async () => {
    return await axios.get(`${API_URL}/students`);
};

export const createStudent = async (student) => {
    return await axios.post(`${API_URL}/students`, student);
};

export const deleteStudent = async (id) => {
    return await axios.delete(`${API_URL}/students/${id}`);
};

// -----------------------------------
// API cho truy vấn
// -----------------------------------
export const getStudentCosts = async () => {
    return await axios.get(`${API_URL}/query/student-costs`);
};

export const getServicesByDate = async (dateRange) => {
    return await axios.post(`${API_URL}/query/services`, dateRange);
};

export const getGuestVisits = async () => {
    return await axios.get(`${API_URL}/query/guests`);
};

// -----------------------------------
// API cho khách
// -----------------------------------
export const addGuestVisit = async (guestVisit) => {
    return await axios.post(`${API_URL}/guests/visit`, guestVisit);
};

// -----------------------------------
// API cho dịch vụ
// -----------------------------------
export const addServiceUsage = async (serviceUsage) => {
    return await axios.post(`${API_URL}/services/use`, serviceUsage);
};