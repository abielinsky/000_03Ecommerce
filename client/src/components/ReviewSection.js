import React, { Component } from "react";
import Review from "./Review";

export default class ReviewSection extends Component {
  render() {
    const { reviews } = this.props;

    return (
      <div>
        {reviews.map((review, index) => (
          <Review key={index} rating={review.rating} review={review.review} />
        ))}
      </div>
    );
  }
}