import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import Weather from "./pages/weather/Weather";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true, headers: { "Content-Type": "application/json" } });
        console.log("User session active:", res.data);
      } catch (error) {
        console.log("No active session", error);
      }
    };
    checkSession();
  }, [])
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
