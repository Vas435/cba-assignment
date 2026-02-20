import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import "./components.css";

const EmployeeView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => setEmployee(res.data));
    }, [id]);

    if (!employee) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="header-card">
                <h2>Employee Details</h2>
            </div>
            <div className="card">
                <p><strong>First Name:</strong> {employee.firstName}</p>
                <p><strong>Last Name:</strong> {employee.lastName}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Gender:</strong> {employee.gender}</p>
                
                <button className="btn btn-primary" onClick={() => navigate("/employees")}>Back to List</button>
            </div>
        </div>
    );
};

export default EmployeeView;