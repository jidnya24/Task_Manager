import React, { useState } from "react";
import { AppBar, Toolbar, Box, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: "transparent",
        boxShadow: "none",
        backdropFilter: "none"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left: Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Logo" width="120" style={{ cursor: "pointer" }} /> 
        </Box>

        {/* Right: Sign In/Sign Up */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Link to="/signin" style={{ textDecoration: 'none' }}>
            <Button 
              variant="outlined" 
              sx={{ 
                borderRadius: "50px",  // Fully rounded
                padding: "10px 24px",
                color: "#a52a2a", 
                borderColor: "#a52a2a", 
                "&:hover": { borderColor: "#8b1e1e", backgroundColor: "#f4e1d2" } 
              }}
            >
              Sign In
            </Button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button 
              variant="outlined"  // Now outlined instead of contained
              sx={{ 
                borderRadius: "50px",
                padding: "10px 24px",
                color: "#a52a2a", 
                borderColor: "#a52a2a", 
                "&:hover": { borderColor: "#8b1e1e", backgroundColor: "#f4e1d2" } 
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton sx={{ display: { md: "none" } }} onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer Menu */}
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250, p: 2 }}>
            <Link to="/signin" style={{ textDecoration: 'none', width: '100%' }}>
              <Button 
                variant="outlined" 
                sx={{ 
                  borderRadius: "50px",  // Fully rounded
                  padding: "14px 30px",  // Adjust padding (increase first value for height)
                  height: "55px",  // Explicitly set height
                  color: "#a52a2a",  
                  borderColor: "#a52a2a",  
                  "&:hover": { borderColor: "#8b1e1e", backgroundColor: "#f4e1d2" }  
                }}
                
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none', width: '100%' }}>
              <Button 
                fullWidth
                variant="outlined"  // Now outlined instead of contained
                sx={{ 
                  borderRadius: "50px",
                  padding: "10px 24px",
                  color: "#a52a2a", 
                  borderColor: "#a52a2a", 
                  "&:hover": { borderColor: "#8b1e1e", backgroundColor: "#f4e1d2" }  
                }}
              >
                Sign Up
              </Button>
            </Link>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
