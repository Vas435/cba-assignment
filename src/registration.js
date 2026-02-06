import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        department: "",
        gender: "",
        hobbies: []
    });

    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
       
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    // Special handler for Checkboxes (Hobbies)
    const handleHobbyChange = (e) => {
        const { value, checked } = e.target;
        let updatedHobbies = [...form.hobbies];

        if (checked) {
            updatedHobbies.push(value);
        } else {
            updatedHobbies = updatedHobbies.filter((hobby) => hobby !== value);
        }

        setForm({ ...form, hobbies: updatedHobbies });
    };

    const validate = () => {
        const newErrors = {};
        
        if (!form.username.trim()) newErrors.username = "Username is required";
        
        if (!form.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!form.password) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Password must be 6+ chars";

        if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!form.department) newErrors.department = "Please select a department";
        if (!form.gender) newErrors.gender = "Please select a gender";

        return newErrors;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const validateErrors = validate();
        setErrors(validateErrors);

        if (Object.keys(validateErrors).length === 0) {
            const nameParts = form.username.trim().split(" ");

            const newUser = {
                firstName: nameParts[0],
                lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "",
                email: form.email,
                department: form.department,
                gender: form.gender,
                hobbies: form.hobbies
            };

            try {
                const response = await fetch("http://localhost:3001/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newUser)
                });

                if (!response.ok) {
                    throw new Error("Failed to register employee.");
                }

                console.log("Registration Successful:", newUser);
                alert("Employee Registered Successfully!");
            } catch (error) {
                console.error("Error registering employee:", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h2>Employee Registration</h2>

            {/* Username */}
            <div>
                <label>Full Name</label>
                <input type="text" name="username" value={form.username} onChange={handleChange} />
                {errors.username && <div className="error">{errors.username}</div>}
            </div>

            {/* Email */}
            <div>
                <label>Email ID</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} />
                {errors.email && <div className="error">{errors.email}</div>}
            </div>

             {/* Password */}
            <div>
                <label>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} />
                {errors.password && <div className="error">{errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            </div>

            {/* Department (Select) */}
            <div>
                <label>Department</label>
                <select name="department" value={form.department} onChange={handleChange}>
                    <option value="">-- Select Department --</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                </select>
                {errors.department && <div className="error">{errors.department}</div>}
            </div>

            {/* Gender (Radio) */}
            <div>
                <label>Gender: </label>
                <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
                <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
                {errors.gender && <div className="error">{errors.gender}</div>}
            </div>

            {/* Hobbies (Checkbox) */}
            <div>
                <label>Hobbies: </label>
                <br />
                <input type="checkbox" name="hobbies" value="Coding" onChange={handleHobbyChange} /> Coding
                <input type="checkbox" name="hobbies" value="Reading" onChange={handleHobbyChange} /> Reading
                <input type="checkbox" name="hobbies" value="Gaming" onChange={handleHobbyChange} /> Gaming
            </div>

           

            <button type="submit">Register</button>
            
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </form>
    );
};

export default Registration; 