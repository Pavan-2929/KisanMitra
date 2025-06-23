import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import Weather from "./pages/weather/Weather";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blog from "./pages/blog";
import ChatBot from "./components/ChatBot";
import Crop from "./pages/Crop";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/crop" element={<Crop />} />
      </Routes>
      <Footer />
      <ChatBot />
    </BrowserRouter>
  );
}

export default App;
