import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Index";
import Home from "./pages/home/home";
import Register from "./pages/register/Index";

function App() {
  return (
    <BrowserRouter>
   <Routes>
  <Route path="/" element={<Navigate to="/home" replace />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/home" element={<Home />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;