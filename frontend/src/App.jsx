import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import Weather from "./pages/weather/Weather";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
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
