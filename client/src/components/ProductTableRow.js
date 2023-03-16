import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER } from "../config/global_constants";
import StarRating from "./StarRating";
export default class ProductTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
        quantity:0,
        products: [],
        rating: 0,
        activeIndex: 0,
        ratingMessage: ""
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


    componentDidMount(){
    }

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    onSendToCart = async(productId)=>{
        if (this.state.quantity>0){
            this.props.addToCart(productId, this.state.quantity);
            this.setState({ quantity: 0 });
        }
    }

    render() {
        const {activeIndex}=this.state

        return (
            <div className= "card1">

                <div className="container-wrapper">
                    <img className="imageP" src={require(`../Image/${this.props.product.image[activeIndex]}`)} alt=""/>
                    <button onClick={this.handleNextClick} className="next_round">&#8250;</button>
                    <button onClick={this.handlePrevClick} className="previous_round"> &#8249;</button>
                </div>

                <div className="desWrap">
                    <h6 className="">{this.props.product.name}</h6>
                    <p className="" >{this.props.product.description}</p>
                    <p className=""><strong>price: €</strong> {this.props.product.price}</p>
                    <p className=""><strong>wight:</strong> {this.props.product.weight}</p>
                    <p className=""><strong>category:</strong> {this.props.product.category}</p>
                </div>
                
                <StarRating className="rating" rating={this.props.product.rating} />

                <div className="">
                    {localStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER ? (
                        <div>
                            <div className="container"/>
                            <input name="quantity" type="number" min={0} max={10} value={this.state.quantity} onChange={this.onChange} />
                            <button  disabled={this.state.quantity<=0}  onClick={()=>this.onSendToCart(this.props.product._id)}>+</button>
                        </div>
                    ) : (
                        null
                    )}

                    {parseInt(localStorage.accessLevel) >= ACCESS_LEVEL_ADMIN ? (
                        <div className="container">
                            <Link className="green-button" to={"/EditProduct/" + this.props.product._id}> Edit </Link>
                            <Link className="red-button" to={"/DeleteProduct/" + this.props.product._id}> Delete </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}