import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const ListItinerario = () => {
    const [lugares, setlugares] = useState([]);
    const URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();  // Hook para navegar
    const redirectToPlace = (id) => {
        navigate(`/lugar/${id}`);    
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const url = `${URL}api/itinerary/${user.id}`;
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                
                setlugares(data.slice(0, 20));
            } else {
                    console.error('No results found:', data);
            }
        })
        .catch(error => console.error('Error fetching categories:', error));
        }, []);
    return (
        
        <div className="grid grid-cols-1 p-6 md:grid-cols-3 gap-4">
        {lugares.map(place => (
            <div onClick={() => redirectToPlace(place.id)} key={place.id} className="bg-white p-3 max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full h-48 object-cover" src={place.photoUrl} alt={place.displayName.text} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{place.displayName.text}</div>
                    <p className="text-gray-700 text-base">{place.formattedAddress}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                </div>
            </div>
        ))}
    </div>
    );
}
