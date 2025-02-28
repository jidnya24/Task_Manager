import api from "./api";

// User Login API
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // Return token/user data
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

// User Registration API
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

// Logout Function (Clears token)
export const logoutUser = () => {
  localStorage.removeItem("token");
};
