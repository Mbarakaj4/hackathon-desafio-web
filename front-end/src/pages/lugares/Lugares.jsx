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
    <div className="min-h-screen bg-gray-100">
      <Header title="Buscar lugares" />
      <div className="container w-full ">
        <div
          className="relative bg-cover bg-center mb-6"
          style={{ backgroundImage: "url('/banner.png')" }}
        >
          <div className="py-32">
            <h1 className="text-3xl font-bold text-center text-gray-800"></h1>
          </div>
        </div>

        <BarCategorias />
        <ListLugares />
      </div>
    </div>
  );
};

export default Lugares;
