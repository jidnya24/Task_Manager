import api from "./api";

// Fetch Tasks
export const getTasks = async () => {
  try {
    const response = await api.get("/tasks", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch tasks";
  }
};

// Add Task
export const addTask = async (task) => {
  try {
    const response = await api.post("/tasks", task, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to add task";
  }
};
