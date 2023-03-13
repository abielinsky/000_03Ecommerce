import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN } from "../config/global_constants";

export default class ProductTableRow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      activeIndex: 0,

    };
  }

  handlePrevClick = () => {
    const { activeIndex } = this.state;
    const lastIndex = this.props.product.image.length - 1;
    const shouldResetIndex = activeIndex === 0;
    const index = shouldResetIndex ? lastIndex : activeIndex - 1;
  
    this.setState({
        activeIndex: index,
    });
  }
  
  handleNextClick = () => {
    const { activeIndex } = this.state;
    const lastIndex = this.props.product.image.length - 1;
    const shouldResetIndex = activeIndex === lastIndex;
    const index = shouldResetIndex ? 0 : activeIndex + 1;
  
    this.setState({
        activeIndex: index,
    });
    console.log(this.state.activeIndex)
  }
  render() {
    const {activeIndex}=this.state

    return (
      <div class= "container">
        <div className="product-table-cell">
         
          <div className="container-wrapper" >
            <img  class="imageP" src={require(`../Image/${this.props.product.image[activeIndex]}`)}  alt=""  />
            <button onClick= {this.handleNextClick} className="next_round">&#8250;</button>
            <button onClick= {this.handlePrevClick} className="previous_round"> &#8249;</button>
            </div>
           
        {/* <p >{this.props.product.id}</p> */}
        <h3 >{this.props.product.name}</h3>
        <p >{this.props.product.description}</p>
        <p ><span>€</span>{this.props.product.price}</p>
        <p >{this.props.product.weight}</p>
        <p >{this.props.product.category}</p>
        </div>
       

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