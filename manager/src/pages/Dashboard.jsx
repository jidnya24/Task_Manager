import React, { useEffect, useState } from "react";
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Button,
  Box, CssBaseline, TextField, IconButton, ListItemSecondaryAction, Dialog,
  DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:7183/api/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!title) return;
    await fetch("http://localhost:7183/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    });
    setTitle("");
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:7183/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setEditTitle(task.title);
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:7183/api/tasks/${editTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title: editTitle })
    });
    setEditTask(null);
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemText primary="Analytics" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="More Features" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Add Task */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Add Task</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <TextField
              label="Task Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddTask}>
              Add
            </Button>
          </Box>
        </Box>

        {/* Task List */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Your Tasks</Typography>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id}>
                <ListItemText primary={task.title} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleEdit(task)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(task.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={!!editTask} onClose={() => setEditTask(null)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            label="Task Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditTask(null)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
