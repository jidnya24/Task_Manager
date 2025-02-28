import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        uname: "",  // Changed 'name' to 'uname'
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("https://localhost:7183/api/auth/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setSuccess(response.data.message);
            setFormData({ uname: "", email: "", password: "" }); // Reset form

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Registration failed");
            } else {
                setError("Network error. Please try again.");
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="uname"  // Changed 'name' to 'uname'
                    placeholder="Enter Name"
                    value={formData.uname}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
