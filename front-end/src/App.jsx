import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Categoria from './pages/categoria/Categoria';
import Lugares from './pages/lugares/Lugares';
import LugarPage from "./pages/categoria/detalleCategoria/LugarPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/categoria" element={<Lugares/>} />
      <Route path="/categoria/:category" element={<Lugares/>} />
       <Route path="/categoria/lugar/:id" element={<LugarPage />} />
    </Routes>
  );
}

export default App;
