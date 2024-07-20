import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Lugares from "./pages/lugares/Lugares";
import Categoria from "./pages/categoria/Categoria";
import LugarPage from "./pages/categoria/detalleCategoria/LugarPage";
import List from "./pages/itinerario/List";
import RegisterPage from "./pages/login/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/categoria" element={<Lugares />} />
      <Route path="/categoria/:category" element={<Lugares />} />
      <Route path="/lugar/:id" element={<LugarPage />} />
      <Route path="/itinerario" element={<List/>} />
      <Route path="/registrarse" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
