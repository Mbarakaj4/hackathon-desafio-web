import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Imagenes from "../../../components/Categorias/lugares/Imagenes";
import { Textarea } from "@nextui-org/react";
import Header from "../../../components/header";
import StarRating from "../../../components/StarRating";

const LugarPage = () => {
  const URL = import.meta.env.VITE_API_URL;
  const [lugar, setLugar] = useState(null);
  const [reviews, setReviews] = useState([]);
  //obtener el nombre del lugar desde la URL
  const id = useParams().id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Enviando reseña");
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(`${URL}api/review/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          comment: event.target.review.value,
          user: user.userId,
          rating: event.target.rating.value,
          placeId: id,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      if (response.ok) {
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
        } catch (error) {
          console.log(error);
          alert(error.message);
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
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
      } catch (error) {
        console.log(error);
        alert(error.message);
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
              <span>{lugar.averageRating}</span>
              <StarRating
                rating={lugar.averageRating}
                score_by={lugar.averageRating}
                number={5}
              />

              <button className="bg-blue-500 text-white px-2 py-1 rounded-md hidden">
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
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2  rounded-md"
                >
                  Enviar
                </button>
              </form>
            </section>
            {reviews ? (
              <section className="flex flex-col justify-center p-8 gap-4 w-1/2">
                <h2 className="text-2xl">Reseñas</h2>
                <div className="flex items-center gap-4">
                  <StarRating rating={reviews.percentageFive || 0} number={5} />
                  <span>{reviews.percentageFive || 0} %</span>
                </div>
                <div className="flex items-center gap-4">
                  <StarRating rating={4} number={5} />
                  <span>{reviews.percentageFour || 0} %</span>
                </div>
                <div className="flex items-center gap-4">
                  <StarRating rating={3} number={5} />
                  <span>{reviews.percentageThree || 0} %</span>
                </div>
                <div className="flex items-center gap-4">
                  <StarRating rating={2} number={5} />
                  <span>{reviews.percentageTwo || 0} %</span>
                </div>
                <div className="flex items-center gap-4">
                  <StarRating rating={1} number={5} />
                  <span>{reviews.percentageOne || 0} %</span>
                </div>
                {reviews.reviews.map((review) => (
                  <div key={review._id} className="flex flex-col gap-4">
                    <h3 className="text-xl">{review.title}</h3>
                    <div className="flex flex-col items-start gap-4 border border-blue-100 rounded-md p-4 shadow-sm">
                      <span className="font-semibold">{review.username}</span>
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
