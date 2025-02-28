import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/NavBar";
import "@fontsource/poppins";

function App() {
  return (
    <Router>
      {/* Navbar stays outside Routes */}
      <Navbar />

      {/* Pages */}
      <div style={{ marginTop: "80px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />  {/* Changed path to /home */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
