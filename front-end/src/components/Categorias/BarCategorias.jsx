import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate de react-router-dom
export const BarCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // Hook para navegar
  const redirectToCategory = (categoria) => {
    navigate(`/categoria/${categoria.name}`);
  };
  useEffect(() => {
    const url = `${URL}api/maps/categories`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setCategorias(data.slice(0, 20));
        } else {
          console.error("No results found:", data);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  return (
    <div className="w-full flex justify-center overflow-x-auto bg-white py-2">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          {categorias.map((categoria, index) => (
            <div
              onClick={() => redirectToCategory(categoria)}
              className="flex items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-gray-100"
              key={index}
            >
              <img
                className="w-6 h-6"
                src={categoria.image}
                alt={categoria.name}
              />
              <p className="text-sm font-medium text-gray-900">
                {categoria.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
