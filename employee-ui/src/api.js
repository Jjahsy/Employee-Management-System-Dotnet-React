import axios from 'axios';

// Backend API ka URL (Jo port aap ka chal raha hai)
const API_BASE_URL = 'http://localhost:5036/api/employees';

export const getEmployees = () => axios.get(API_BASE_URL);
export const getEmployeeById = (id) => axios.get(`${API_BASE_URL}/${id}`);
export const createEmployee = (employee) => axios.post(API_BASE_URL, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_BASE_URL}/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_BASE_URL}/${id}`);
