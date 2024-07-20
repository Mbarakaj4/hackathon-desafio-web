import { useNavigate } from "react-router-dom";
import { useState } from "react";
function LoginPage() {
  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${URL}api/security/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        //guardar el objeto user en el localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/categoria");
      }
      throw new Error(data.message);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (localStorage.getItem("token")) {
    navigate("/categoria");
  }
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Iniciar sesión
            </h2>
          </div>
          <form className="mt-8 mb-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4 mb-4">Email</label>

                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Usuario"
                />
              </div>
              <div>
              <label htmlFor="password" className="block text-sm  mt-4 font-medium text-gray-700 mb-4">Contraseña</label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Cargando..." : "Iniciar sesión"}
              </button>
            </div>
          </form>
          <a href="/registrarse" className="mt-8 text-center">
            No tienes cuenta? Regístrate
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
