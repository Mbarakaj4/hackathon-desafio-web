import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';


import Categoria from './pages/categoria/Categorias';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/categoria" element={<Categoria/>} />
    </Routes>
  );
}

export default App;
