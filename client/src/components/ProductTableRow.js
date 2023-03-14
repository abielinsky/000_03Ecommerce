import React, { Component } from "react";
import { Link } from "react-router-dom";
// import {Form, Button, Row} from "react-bootstrap";
import { ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER } from "../config/global_constants";

export default class ProductTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
        quantity:0,
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
            <div className= "card">

                <div className="container-wrapper">
                    <img className="imageP" src={require(`../Image/${this.props.product.image[activeIndex]}`)} alt=""/>
                    <button onClick={this.handleNextClick} className="next_round">&#8250;</button>
                    <button onClick={this.handlePrevClick} className="previous_round"> &#8249;</button>
                </div>

                {/*<img className="card-img-top" src={require(`../Image/${this.props.product.image[0]}`)} alt="product"/>*/}
                <div className="card-body">
                    <h5 className="card-title">{this.props.product.name}</h5>
                    <p className="card-text" >{this.props.product.description}</p>
                    <p className="card-text"><strong>price:</strong> {this.props.product.price}€</p>
                    <p className="card-text"><strong>wight:</strong> {this.props.product.weight}</p>
                    <p className="card-text"><strong>category:</strong> {this.props.product.category}</p>
                </div>
                <div className="card-footer">
                    {localStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER ? (





                        // <Row>
                        //     <div className="col-1"/>
                        //     <input className="form-control col-3" name="quantity" type="number" min={0} max={10} value={this.state.quantity} onChange={this.onChange} />
                        //     <Button className="default-button col-2" disabled={this.state.quantity<=0}  onClick={()=>this.onSendToCart(this.props.product._id)}>+</Button>
                        // </Row>

                        //todo using css for the card-deck2 in productTable.js
                        <div className="product-table-row">
                            <div className="product-table-cell"></div>
                            <input className="product-table-cell" name="quantity" type="number" min={0} max={10} value={this.state.quantity} onChange={this.onChange} />
                            <button className="product-table-button" disabled={this.state.quantity <= 0} onClick={() => this.onSendToCart(this.props.product._id)}>+</button>
                        </div>






                    ) : (
                        null
                    )}

                    {parseInt(localStorage.accessLevel) >= ACCESS_LEVEL_ADMIN ? (
                        <div>
                            <Link className="green-button" to={"/EditProduct/" + this.props.product._id}> Edit </Link>
                            <Link className="red-button" to={"/DeleteProduct/" + this.props.product._id}> Delete </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}