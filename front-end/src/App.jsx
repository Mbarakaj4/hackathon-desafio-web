import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";

import Categoria from "./pages/categoria/Categoria";
import LugarPage from "./pages/categoria/detalleCategoria/LugarPage";
import Lugares from "./pages/categoria/Lugares";
import { List } from "./pages/itinerario/List";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/categoria" element={<Lugares />} />
      <Route path="/categories/:category" element={<Categoria />} />
      <Route path="/categoria/lugar" element={<LugarPage />} />
      <Route path="/categoria/lugar/:id" element={<LugarPage />} />
      <Route path="/itinerario" element={<List/>} />
    </Routes>
  );
}

export default App;
