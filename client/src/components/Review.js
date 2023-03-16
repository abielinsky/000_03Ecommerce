import React from "react";
import StarRating from "./StarRating";

const Review = (props) => {
  const { rating, review } = props;

  return (
    <div className="review">
      <h5>Review Title</h5>
      <div className="rating">
        <StarRating rating={rating} />
      </div>
      <p>{review}</p>
      <p className="date">Reviewed on {new Date().toDateString()}</p>
    </div>
  );
};

export default Review;