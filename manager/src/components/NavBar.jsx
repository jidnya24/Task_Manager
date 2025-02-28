import React, { useState } from "react";
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: "transparent",  // ✅ Ensures full transparency
        boxShadow: "none",               // ✅ Removes any shadow
        backdropFilter: "none"           // ✅ Prevents background blur effect
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left: Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Logo" width="120" style={{ cursor: "pointer" }} /> 
        </Box>

        {/* Right: Sign In/Sign Up */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Button 
            variant="outlined" 
            sx={{ 
              color: "#a52a2a", 
              borderColor: "#a52a2a", 
              "&:hover": { borderColor: "#8b1e1e", backgroundColor: "#f4e1d2" } 
            }}
          >
            Sign In
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: "#a52a2a", 
              "&:hover": { backgroundColor: "#8b1e1e" } 
            }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton sx={{ display: { md: "none" } }} onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer Menu */}
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250, p: 2 }}>
            <MenuItem onClick={toggleDrawer(false)}>Home</MenuItem>
            <MenuItem onClick={toggleDrawer(false)}>Features</MenuItem>
            <MenuItem onClick={toggleDrawer(false)}>Pricing</MenuItem>
            <MenuItem onClick={toggleDrawer(false)}>Contact</MenuItem>
            <MenuItem>
              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ 
                  color: "#a52a2a", 
                  borderColor: "#a52a2a", 
                  "&:hover": { borderColor: "#8b1e1e", backgroundColor: "#f4e1d2" } 
                }}
              >
                Sign In
              </Button>
            </MenuItem>
            <MenuItem>
              <Button 
                fullWidth 
                variant="contained" 
                sx={{ 
                  backgroundColor: "#a52a2a", 
                  "&:hover": { backgroundColor: "#8b1e1e" } 
                }}
              >
                Sign Up
              </Button>
            </MenuItem>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
