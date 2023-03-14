import React, { Component } from "react";
import axios from "axios";
import AppNavbar from "../AppNavbar";
import { Button } from "react-bootstrap";
import {
  SERVER_HOST,
  ACCESS_LEVEL_NORMAL_USER,
} from "../../config/global_constants";
import { AddToCart, DeleteFromCart } from "./UpdateCart";
import { Payment } from "./Payment";

const qtyBox = {
  display: "flex",
  border: "0px solid #aaa",
  borderRadius: "5px",
  paddingTop: "5px",
  paddingBottom: "5px",
  marginBottom: "5px",
};
const qtyBtn = {
  paddingLeft: "5px",
  paddingRight: "5px",
  borderRadius: "5px",
  marginBottom: "0px",
  cursor: "pointer",
};

export default class ViewCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: { products: [] },
    };
  }
  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/cart`, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        this.setState({ cart: res.data });
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }

  async onDeleteFromCart(productId) {
    let cart = await DeleteFromCart(productId);
    this.setState({ cart: cart });
  }
  async onUpdateQuantity(productId, productQuantity) {
    let cart = await AddToCart(productId, productQuantity);
    if (cart) this.setState({ cart: cart });
  }

  render() {
    return (
      <>
        <AppNavbar />

        <br />
        {localStorage.accessLevel != ACCESS_LEVEL_NORMAL_USER ? (
          <div className="form-container">
            <p>Login to view!</p>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              {this.state.cart.bill > 0 ? (
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title" tag="h5">
                        <strong>Total: </strong> {this.state.cart.bill}
                      </div>
                      <Payment
                        cartID={this.state.cart._id}
                        amount={this.state.cart.bill}
                      />
                    </div>
                  </div>
                  <br />
                </div>
              ) : (
                <p>No products.</p>
              )}
              <div className="row">
                {this.state.cart.products.map((item) => (
                  <div key={item._id} className="col-md-3">
                    <div className="card">
                      <div className="card-header">
                        <strong>{item.name}</strong>
                      </div>
                      <div className="card-body">
                        <div className="card-text">
                          <strong>Price :</strong> {item.price}
                        </div>
                        <div style={qtyBox}>
                          <div className="card-text">
                            <strong>Quantity :</strong> {item.quantity}
                          </div>
                          <p
                            style={{
                              ...qtyBtn,
                              border: "1px solid green",
                              color: "green",
                            }}
                            onClick={() =>
                              this.onUpdateQuantity(item.productId, 1)
                            }
                          >
                            +
                          </p>
                          <p
                            style={{
                              ...qtyBtn,
                              border: "1px solid red",
                              color: "Red",
                            }}
                            onClick={() =>
                              this.onUpdateQuantity(item.productId, -1)
                            }
                          >
                            -
                          </p>
                        </div>
                        <div className="card-text">
                          <strong>Total :</strong> {item.price * item.quantity}
                        </div>
                      </div>

                      <div className="card-footer">
                        <Button
                          className="btn-danger"
                          onClick={this.onDeleteFromCart.bind(
                            this,
                            item.productId
                          )}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <br />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
