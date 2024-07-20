import React from 'react'

export const BarCategorias = () => {
    const categorias = [
        {id: 1, nombre: 'Comidas', icon: '🍔'},
        {id: 2, nombre: 'Bebidas', icon: '🍺'},
        {id: 3, nombre: 'Frutas', icon: '🍓'},
    ]
  return (
    <div className="flex justify-center">
        {categorias.map((categoria, index) => (
            <div className="flex items-center justify-center space-x-2" key={index}>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <p className="text-sm font-medium text-gray-900">{categoria.nombre}</p>
            </div>
        ))}
        
    </div>
  )
}
