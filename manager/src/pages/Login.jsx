import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
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
            console.log("Sending Data:", formData); // Debugging - Check Payload

            const response = await axios.post(
                "https://localhost:7183/api/auth/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccess(response.data.message);
            console.log("Login Successful:", response.data);
            setFormData({ email: "", password: "" }); // Reset form

        } catch (error) {
            if (error.response) {
                console.error("Login Error:", error.response.data);
                setError(error.response.data.message || "Login failed");
            } else {
                setError("Network error. Please try again.");
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
