import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import "./components.css";

const EmployeeForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL if editing

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        gender: "Male",
        hobbies: []
    });

    // Check if we are in "Edit" mode
    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id)
                .then((resp) => setEmployee(resp.data))
                .catch((err) => console.log(err));
        }
    }, [id]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await EmployeeService.updateEmployee(id, employee);
        } else {
            await EmployeeService.createEmployee(employee);
        }
        navigate("/employees");
    };

    return (
        <div className="container">
            <div className="header-card">
                <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
            </div>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input className="form-control" name="firstName" value={employee.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control" name="lastName" value={employee.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" name="email" value={employee.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Department</label>
                        <select className="form-control" name="department" value={employee.department} onChange={handleChange} required>
                            <option value="">Select Dept</option>
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/employees")}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;