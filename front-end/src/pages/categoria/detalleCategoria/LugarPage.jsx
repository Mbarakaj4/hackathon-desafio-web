import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Imagenes from "../../../components/Categorias/lugares/Imagenes";
import { Textarea } from "@nextui-org/react";
import Header from "../../../components/header";

const LugarPage = () => {
  const URL = import.meta.env.VITE_API_URL;
  const [lugar, setLugar] = useState(null);
  const [reviews, setReviews] = useState([]);
  //obtener el nombre del lugar desde la URL
  const id = useParams().id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/api/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          comment: event.target.review.value,
          user: localStorage.getItem("user"),
          rating: 5,
          placeId: id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setReviews([...reviews, data]);
      }
      throw new Error(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${URL}/api/maps/details/${id}`);
        const reviewsResponse = await fetch(`${URL}/api/review/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        const reviewsData = await reviewsResponse.json();
        setLugar(data);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getData();
  }, [URL]); // Dependencia URL para que useEffect se ejecute nuevamente si URL cambia

  return (
    <>
      <Header />
      <section className="px-8">
        {lugar ? (
          <div className="flex items-center justify-between">
            <h1 className="text-4xl">{lugar.displayName.text}</h1>
            <div className="flex gap-4 items-center ">
              <span>{lugar.averageRating} Estrellas</span>
              <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                Agregar al Itinerario
              </button>
            </div>
          </div>
        ) : (
          <p>Cargando detalles del lugar...</p>
        )}
      </section>
      {lugar && (
        <>
          <Imagenes photos={lugar.photos} />
          <section className="flex flex-col justify-center p-8 gap-4 w-1/2">
            <form onSubmit={handleSubmit}>
              <label htmlFor="review" className="text-2xl">
                Reseña
              </label>
              <Textarea
                name="review"
                placeholder="Escribe tu reseña"
                className="w-full p-2"
                rows={4}
              />
              <button className="bg-blue-500 text-white px-4 py-2  rounded-md">
                Enviar
              </button>
            </form>
          </section>
          {reviews && reviews.length > 0 ? (
            <section className="flex flex-col justify-center p-8 gap-4 w-1/2">
              <h2 className="text-2xl">Reseñas</h2>
              {reviews.map((review) => (
                <div key={review.id} className="flex flex-col gap-4">
                  <h3 className="text-xl">{review.title}</h3>
                  <p>{review.description}</p>
                  <span>{review.rating} Estrellas</span>
                </div>
              ))}
            </section>
          ) : (
            <p className="pr-4">No hay reseñas para este lugar</p>
          )}
        </>
      )}
    </>
  );
};

export default LugarPage;
