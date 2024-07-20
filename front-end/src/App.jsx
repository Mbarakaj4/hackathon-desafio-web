import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";

import Categoria from "./pages/categoria/Categoria";
import LugarPage from "./pages/categoria/detalleCategoria/LugarPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/categoria" element={<Categoria />} />
      <Route path="/categories/:category" element={<Categoria />} />
      <Route path="/categoria/lugar" element={<LugarPage />} />
      <Route path="/categoria/lugar/:id" element={<LugarPage />} />
    </Routes>
  );
}

export default App;
