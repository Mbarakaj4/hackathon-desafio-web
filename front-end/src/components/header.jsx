/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
export default function Header({ title }) {
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };
  const user = localStorage.getItem("user");
  if (!user) {
    nav("/");
  }
  return (
    <header className="">
      <nav className="flex items-center justify-between h-16 bg-gray-800 text-white">
        <h1 className="text-white text-2xl ml-4">{title}</h1>
        <div className="flex items-center gap-4 mr-4">
          <button
            onClick={handleLogout}
            className="text-white bg-blue-600 rounded-md px-4 py-1 hover:text-gray-200 hover:bg-blue-700"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  );
}
