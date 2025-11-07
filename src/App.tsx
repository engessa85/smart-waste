

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MapPage from "./pages/MapPage";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/main" element={<MainPage />} />       
      </Routes>
    </BrowserRouter>
  )
}

export default App
