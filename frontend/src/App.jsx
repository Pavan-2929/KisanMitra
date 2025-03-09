import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import Weather from "./pages/weather/Weather";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
