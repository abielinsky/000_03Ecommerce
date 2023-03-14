import React, { Component } from "react";
import axios from "axios";
import LinkInClass from "../LinkInClass";
import {Redirect, Link} from "react-router-dom"
import { SERVER_HOST, ACCESS_LEVEL_NORMAL_USER, } from "../../config/global_constants";
import AppNavbar from "../AppNavbar";

export default class ViewHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    axios.get(`${SERVER_HOST}/orders`, { headers: { authorization: localStorage.token }, })
      .then((res) => { this.setState({ orders: res.data }); })
      .catch((err) => { console.log("error: ", err); });
  }
  render() {
    return (
      <>
        <AppNavbar/> <br/>
        {localStorage.accessLevel != ACCESS_LEVEL_NORMAL_USER ? (
          <div className="form-container">
            <p>Login as Normal User to view!</p>
          </div>
        ) : (
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">bill</th>
                  <th scope="col">Payment Order</th>
                  <th scope="col">added</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orders.map((order) => (
                  <tr key={order._id}>
                    <th scope="row">
                        <Link to={`/orders/${order._id}`}>{order._id}</Link>
                    </th>
                    <td>{order.bill}</td>
                    <td>{order.paypalPaymentID}</td>
                    <td>{order.date_added}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  }
}
