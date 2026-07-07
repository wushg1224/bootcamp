import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Index";
import Home from "./pages/home/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;