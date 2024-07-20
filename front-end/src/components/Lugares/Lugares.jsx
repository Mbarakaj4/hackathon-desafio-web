import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

const Lugares = () => {
    const site = [
        {
            name: 'Café del Sol',
            image: 'https://via.placeholder.com/150',
            rate: 4.5,
            description: 'Un acogedor café con vistas al río Paraná.',
            precio: '15 USD'
        },
        {
            name: 'Restaurante La Costa',
            image: 'https://via.placeholder.com/150',
            rate: 4.8,
            description: 'Especialidades en pescados y mariscos frescos.',
            precio: '25 USD'
        },
        {
            name: 'Heladería Polar',
            image: 'https://via.placeholder.com/150',
            rate: 4.3,
            description: 'Disfruta de los mejores helados artesanales en la ciudad.',
            precio: '5 USD'
        }
    ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {site.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
            <p className="text-default-500">{item.precio}</p>
            
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
export default Lugares;
    /*import React, { useState, useEffect } from 'react';

export const ListaLugares = ({ categoria }) => {
    const [lugares, setLugares] = useState([]);
    const apiKey = 'YOUR_API_KEY';  // Reemplaza YOUR_API_KEY con tu clave de API real

    useEffect(() => {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${categoria}+in+Encarnación&key=${apiKey}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.results) {
                    setLugares(data.results.slice(0, 20));
                }
            })
            .catch(error => console.error('Error fetching places:', error));
    }, [categoria]);

    return (
        <div>
            <h1>Lugares de Interés en Encarnación: {categoria}</h1>
            {lugares.map((lugar, index) => (
                <div key={index}>
                    <h2>{lugar.name}</h2>
                    <img src={lugar.icon} alt={lugar.name} />
                </div>
            ))}
        </div>
    );
};
 */ 