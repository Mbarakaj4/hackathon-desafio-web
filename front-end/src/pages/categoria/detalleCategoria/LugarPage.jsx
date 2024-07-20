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
      const response = await fetch(`${URL}api/review/${id}`, {
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
        const response = await fetch(`${URL}api/maps/details/${id}`);
        const reviewsResponse = await fetch(`${URL}api/review/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        const reviewsData = await reviewsResponse.json();
        setLugar(data);
        setReviews(reviewsData);
        console.log(reviews);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getData();
  }, [URL, id]); // Dependencia URL para que useEffect se ejecute nuevamente si URL cambia

  return (
    <>
      <Header title="Detalles" />
      <section className="px-8">
        {lugar ? (
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl">{lugar.displayName.text}</h1>
              <div className="flex gap-4">
                <span>{lugar.formattedAddress}</span>
                <a
                  href={lugar.googleMapsUri}
                  className="text-blue-500"
                  target="_blank"
                >
                  Ver en google maps
                </a>
              </div>
            </div>
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
        <div className="flex justify-between">
          <Imagenes photos={lugar.photos} />
          <div className="flex items-start w-full">
            <section className="flex flex-col justify-center p-8 gap-4 w-1/2">
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-4 mb-2">
                  <label htmlFor="rating">Valoramos tu opinión</label>
                  <select
                    name="rating"
                    id=""
                    className="border border-blue-200 rounded-md px-2 py-1"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <label htmlFor="review" className="text-2xl">
                  Escribe tu propia reseña
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
            {reviews ? (
              <section className="flex flex-col justify-center p-8 gap-4 w-1/2">
                <h2 className="text-2xl">Reseñas</h2>
                <span>5 : {reviews.percentageFive} %</span>
                <span>4 : {reviews.percentageFour} %</span>
                <span>3 : {reviews.percentageThree} %</span>
                <span>2 : {reviews.percentageTwo} %</span>
                <span>1 : {reviews.percentageOne} %</span>
                {reviews.reviews.map((review) => (
                  <div key={review._id} className="flex flex-col gap-4">
                    <h3 className="text-xl">{review.title}</h3>
                    <div className="flex flex-col items-start gap-4 border border-blue-100 rounded-md p-4 shadow-sm">
                      <span>{review.username}</span>
                      <div className="flex items-center gap-4">
                        <p>{review.comment}</p>
                        <span>{review.rating} Estrellas</span>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            ) : (
              <p className="pr-4">No hay reseñas para este lugar</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LugarPage;
