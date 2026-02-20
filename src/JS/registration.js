import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Registration = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        department: "IT", // Default value
        gender: "Male",
        hobbies: []
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Prepare data (Split name for compatibility)
        const nameParts = form.username.trim().split(" ");
        const newUser = {
            firstName: nameParts[0],
            lastName: nameParts.slice(1).join(" ") || "",
            email: form.email,
            password: form.password,
            department: form.department,
            gender: form.gender,
            hobbies: form.hobbies
        };

        try {
            // 2. Use AXIOS to save data
            await axios.post("http://localhost:3001/users", newUser);
            
            alert("Registration Successful!");
            navigate("/login"); // <--- REDIRECTS TO LOGIN PAGE
        } catch (error) {
            console.error("Error registering:", error);
            alert("Registration failed. Ensure JSON Server is running.");
        }
    };

    return (
        <div className="container" style={{marginTop: "50px", maxWidth: "500px"}}>
            <div className="card">
                <h2 className="text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="username" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>
                    
                    <button type="submit" className="btn btn-success" style={{width: "100%", marginTop: "10px"}}>Register</button>
                    
                    <div style={{marginTop: "10px", textAlign: "center"}}>
                        <small>Already registered? <Link to="/login">Login here</Link></small>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;