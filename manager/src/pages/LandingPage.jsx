import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5" }}>
            {/* Navbar */}
            <Box sx={{ position: "absolute", top: 0, right: 0, p: 2 }}>
               
            </Box>

            {/* Main Content */}
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                Manage your tasks.
            </Typography>
            <Typography variant="h6" sx={{ color: "gray" }}>
                Manage your tasks efficiently and boost productivity!
            </Typography>
        </Box>
    );
};

export default LandingPage;
