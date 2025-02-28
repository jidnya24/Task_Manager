import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import { Container, Typography, Button } from "@mui/material";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      {error && <Typography color="error">{error}</Typography>}
      {tasks.map((task) => (
        <Typography key={task.id}>{task.title} - {task.status}</Typography>
      ))}
      <Button variant="contained" color="primary">Add Task</Button>
    </Container>
  );
};

export default Dashboard;
