import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Container, Box, TextField, Button, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions 
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    password: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://localhost:7183/api/auth/register", formData);
      console.log("Response:", response.data);

      if (response.status === 201 || response.status === 200) {
        setOpenDialog(true);
      }
    } catch (err) {
      console.error("Registration failed:", err.response?.data);
      setError(
        err.response?.data?.errors 
          ? Object.values(err.response.data.errors).flat().join(" ") 
          : "Registration failed. Please try again."
      );
    }
  };

  const handleContinue = () => {
    setOpenDialog(false);
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Sign Up</Typography>

        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField 
            margin="normal" 
            required 
            fullWidth 
            id="uname" 
            label="Username" 
            name="uname" 
            autoComplete="username" 
            value={formData.uname}
            onChange={handleChange}
          />
          <TextField 
            margin="normal" 
            required 
            fullWidth 
            id="email" 
            label="Email Address" 
            name="email" 
            autoComplete="email" 
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          
          {error && (
            <Typography color="error" sx={{ textAlign: "center", mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: "50px" }}
          >
            Sign Up
          </Button>
          
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Already have an account? <a href="/signin">Sign In</a>
          </Typography>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleContinue} fullWidth maxWidth="xs">
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          🎉 User Registered Successfully!
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="center">
            Your account has been created. Click "Continue" to proceed.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button 
            variant="contained" 
            sx={{ borderRadius: "50px", padding: "10px 20px" }} 
            onClick={handleContinue}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
    