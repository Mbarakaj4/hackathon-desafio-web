import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const ListLugares = () => {
    const URL = import.meta.env.VITE_API_URL;    
    const [lugares, setLugares] = useState([]); 
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname.split('/')[2]);
    useEffect(() => {
        const url = `${URL}api/maps/search-places`;
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                textQuery: `${location.pathname.split('/')[2]}`
            })
        };

        fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                setLugares(data);
                console.log(data);
            } else {
                console.error('No results found:', data);
            }
        })
        .catch(error => console.error('Error fetching places:', error));
    }, [URL, location.pathname]);

    const redirectToPlace = (id) => {
        navigate(`/lugar/${id}`);
    };

    console.log(lugares);
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
};
