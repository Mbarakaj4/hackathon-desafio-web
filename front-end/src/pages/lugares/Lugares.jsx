import React, { useEffect } from "react";
import { ListLugares } from "../../components/Lugares/ListLugares";
import { BarCategorias } from "../../components/Categorias/BarCategorias";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

const Lugares = () => {
  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      console.log("No hay usuario");
      nav("/");
    }
  }, [nav]); // Dependencia nav para reaccionar si cambia, aunque es poco probable que cambie.

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    <Header title="Buscar lugares" />
    <div className="flex-grow container mx-auto p-4 flex flex-col justify-center">
      <div
        className="bg-cover bg-center mb-6 w-full"
        style={{ backgroundImage: "url('/banner.png')" }}
      >
        <div className="py-32">
          <h1 className="text-3xl font-bold text-center text-white"></h1>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <BarCategorias />
        <ListLugares />
      </div>
    </div>
  </div>
  );
};

export default Lugares;
