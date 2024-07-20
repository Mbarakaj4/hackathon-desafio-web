import React from 'react';
import { ListLugares } from '../../components/Lugares/ListLugares';
import { BarCategorias } from '../../components/Categorias/BarCategorias';

const Lugares = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="relative bg-cover bg-center mb-6" style={{ backgroundImage: "url('/banner.png')" }}>
          <div className="py-32">  
            <h1 className="text-3xl font-bold text-center text-gray-800"></h1>
          </div>
        </div>

        <BarCategorias />
        <ListLugares />
      </div>
    </div>
  );
}

export default Lugares;
