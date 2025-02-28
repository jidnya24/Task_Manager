import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Welcome to Task Manager</Typography>
      <Button variant="contained" color="primary" style={{ margin: "10px" }} component={Link} to="/login">
        Login
      </Button>
      <Button variant="outlined" color="secondary" component={Link} to="/register">
        Register
      </Button>
    </Container>
  );
};

export default Home;
