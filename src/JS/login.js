import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; 

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(""); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // OPTION A: If you have a real backend, use this:
            // const response = await axios.post("http://localhost:3001/login", form);
            
            // OPTION B: For JSON-Server (simulating login by fetching users)
            // We fetch ALL users and find one that matches the email/password
            const response = await axios.get("http://localhost:3001/users");
            const user = response.data.find(u => u.email === form.email && u.password === form.password);

            if (user) {
                alert("Login Successful!");
                navigate("/employees"); // <--- THIS REDIRECTS TO DASHBOARD
            } else {
                setError("Invalid email or password");
            }

        } catch (err) {
            console.error(err);
            setError("Something went wrong. Is the server running?");
        }
    };

    return (
        <div className="container" style={{marginTop: "50px", maxWidth: "400px"}}>
            <div className="card">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email ID</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control"
                            value={form.email} 
                            onChange={handleChange} 
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control"
                            value={form.password} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    
                    {error && <p style={{color: "red"}}>{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{width: "100%"}}>Login</button>
                    
                    <div style={{marginTop: "10px", textAlign: "center"}}>
                        <small>Don't have an account? <Link to="/registration">Register here</Link></small>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;