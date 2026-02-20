import React, { useEffect, useState } from "react";
import employeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import "./components.css";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const result = await employeeService.getAllEmployees();
            setEmployees(result.data);
        } catch (error) {
            console.error("Error loading employees:", error);
        }
    };

    const deleteEmployee = async (id) => {
        if(window.confirm("Are you sure you want to delete this employee?")) {
            await employeeService.deleteEmployee(id);
            loadEmployees(); // Refresh list
        }
    };

    return (
        <div className="container">
            {/* Purple Header */}
            <div className="header-card">
                <h2>Employee Management</h2>
            </div>

            <div className="table-container">
                <button className="btn btn-primary" onClick={() => navigate("/add-employee")}>
                    + Create New Employee
                </button>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.firstName} {emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>{emp.department}</td>
                                <td>
                                    <button 
                                        className="btn btn-info" 
                                        onClick={() => navigate(`/view-employee/${emp.id}`)}>
                                        View
                                    </button>
                                    <button 
                                        className="btn btn-warning" 
                                        onClick={() => navigate(`/edit-employee/${emp.id}`)}>
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => deleteEmployee(emp.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;