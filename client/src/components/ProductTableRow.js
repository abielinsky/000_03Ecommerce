import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN } from "../config/global_constants";

export default class ProductTableRow extends Component {
  render() {
    return (
      <div class= "container">
        <div className="product-table-cell">
          <img src={require(`../Image/${this.props.product.image}`)} alt="product" />
        </div>
        <p >{this.props.product.id}</p>
        <p >{this.props.product.name}</p>
        <p >{this.props.product.description}</p>
        <p >{this.props.product.price}</p>
        <p >{this.props.product.weight}</p>
        <p >{this.props.product.category}</p>
        <div className="product-table-cell">
          {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? (
            <Link className="green-button" to={"/EditProduct/" + this.props.product._id}>
              Edit
            </Link>
          ) : null}

          {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? (
            <Link className="red-button" to={"/DeleteProduct/" + this.props.product._id}>
              Delete
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}