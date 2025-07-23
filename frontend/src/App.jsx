import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import Weather from "./pages/weather/Weather";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import UploadCrop from "./pages/UploadCrop";
import { Toaster } from 'react-hot-toast';
import Crops from "./pages/Crops";
import CropInformation from "./pages/CropInformation";
import Blogs from "./pages/Blogs";
import { useSelector } from "react-redux";
import UploadBlog from "./pages/UploadBlog";
import Profile from "./components/Profile";
import Translate from "./components/controls/Translate";
import Blog from "./pages/Blog";

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <div className=" overflow-hidden">
      <BrowserRouter>
        <Toaster />
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {!isLogin && <Route path="/signin" element={<SignIn />} />}
            <Route path="/weather" element={<Weather />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            {isLogin && <Route path="/upload-crop" element={<UploadCrop />} />}
            <Route path="/all-crops" element={<Crops />} />
            {isLogin && <Route path="/crop-information/:id" element={<CropInformation />} />}
            {isLogin && <Route path="/upload-blog" element={<UploadBlog />} />}
            {isLogin && <Route path="/profile" element={<div className="text-center py-10"><Profile /></div>} />}
            <Route path="*" element={<div className="text-center py-10">Page Not Found</div>} />
          </Routes>
        </div>
        <Footer />
        <ChatBot />
      </BrowserRouter>
    </div>
  );
}

export default App;
