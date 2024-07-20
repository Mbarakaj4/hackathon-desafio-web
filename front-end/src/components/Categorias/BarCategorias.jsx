import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate de react-router-dom

export const BarCategorias = () => {
    const categorias = [
        {name: 'Bar', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
    ];

    const navigate = useNavigate();  // Hook para navegar

    const redirectToCategory = (categoria) => {
        navigate(`/categories/${categoria.name}`);
    };

    return (
        <div className="flex justify-center">
            <div>hola</div>
            {categorias.map((categoria, index) => (
                <div onClick={() => redirectToCategory(categoria)} className="flex items-center justify-center space-x-2" key={index}>
                    <img className="w-6 h-6 bg-gray-200 rounded-full" src={categoria.image} alt={categoria.name} />
                    <p className="text-sm font-medium text-gray-900">{categoria.name}</p>
                </div>
            ))}
        </div>
    );
};
