import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';


import Categoria from './pages/categoria/Categoria';
import Lugares from './pages/lugares/Lugares';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/categoria" element={<Lugares/>} />
      <Route path="/categoria/:category" element={<Lugares/>} />
    </Routes>
  );
}

export default App;
