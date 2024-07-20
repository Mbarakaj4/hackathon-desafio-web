/* eslint-disable react/prop-types */
import { Star } from "./Star";
export const StarRating = ({ rating, score_by, number }) => {
  const stars = Array.from({ length: number }, (_, index) => (
    <div key={index}>
      <Star active={rating > index} />
    </div>
  ));

  return <div className="rated-section star-rating-controls flex">{stars}</div>;
};

export default StarRating;
