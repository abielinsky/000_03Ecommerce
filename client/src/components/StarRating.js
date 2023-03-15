import React, { Component } from "react";

export default class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      ratingMessage: ""
    };
  }

  handleStarClick = (rating) => {
    this.setState({ rating });

    // Show a prompt to get the rating message from the user
    const ratingMessage = prompt("Enter a rating message:");
    this.setState({ ratingMessage });
  }

  render() {
    const { rating, ratingMessage } = this.state;

    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;
          const isFilled = ratingValue <= rating;

          return (
            <span
              key={ratingValue}
              className={`star ${isFilled ? "filled" : ""}`}
              onClick={() => this.handleStarClick(ratingValue)}
            >
              ★
            </span>
          );
        })}
        <p>{ratingMessage}</p>
      </div>
    );
  }
}