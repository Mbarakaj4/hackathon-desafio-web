export default function Header() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <header className="">
      <nav className="flex items-center justify-between h-16 bg-gray-800 text-white">
        <h1 className="text-white text-2xl ml-4">Detalles</h1>
        <div className="flex items-center gap-4 mr-4">
          <a href="/" className="text-white hover:text-gray-200">
            Inicio
          </a>
          <a href="/categoria" className="text-white hover:text-gray-200">
            Categorías
          </a>
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
