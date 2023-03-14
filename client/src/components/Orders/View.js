import React, { Component } from "react";
import axios from "axios";
import LinkInClass from "../LinkInClass";
import { Redirect, Link } from "react-router-dom";
import {
  SERVER_HOST,
  ACCESS_LEVEL_NORMAL_USER,
} from "../../config/global_constants";
import AppNavbar from "../AppNavbar";

export default class ViewHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { order: { products: [] } };
  }
  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/orders/${this.props.match.params.id}`, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        this.setState({ order: res.data });
      })
      .catch((err) => {
        console.log("error: ", err);
      });

    // console.log(this.props.match.params);
  }
  render() {
    return (
      <>
        <AppNavbar />
        <br />
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-3">
                  <strong>Order ID</strong>
                </div>
                <div className="col-7"> {this.state.order._id}</div>
              </div>
              <div className="row">
                <div className="col-3">
                  <strong>Payment ID</strong>
                </div>
                <div className="col-7">{this.state.order.paypalPaymentID}</div>
              </div>
              <div className="row">
                <div className="col-3">
                  <strong>Created</strong>
                </div>
                <div className="col-7">{this.state.order.date_added}</div>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.order.products.map((order) => (
                    <tr key={order._id}>
                      <th scope="row">{order.name}</th>
                      <td>{order.quantity}</td>
                      <td>{order.price}</td>
                      <td>{order.quantity * order.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} />
                    <td>{this.state.order.bill}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="row">
            <Link className="red-button" to={"/orders"}>Back</Link>
          </div>
        </div>
      </>
    );
  }
}
