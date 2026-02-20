import axios from "axios";
import { API_BASE_URL } from "../utils/apiConfig";

const API_URL = `${API_BASE_URL}/users`;

const getAllEmployees = () => axios.get(API_URL);

const getEmployeeById = (id) => axios.get(`${API_URL}/${id}`);

const createEmployee = (employee) => axios.post(API_URL, employee);

const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);

const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);

export default {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};