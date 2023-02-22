import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ACCESS_LEVEL_ADMIN, SERVER_HOST } from "../config/global_constants";

export default class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      price: "",
      weight: "",
      image: "",
      category: "",
      redirectToDisplayAllProducts:
        localStorage.accessLevel < ACCESS_LEVEL_ADMIN,
      productObject: [], // Add productObject state
    };
  }

  componentDidMount() {
    this.inputToFocus.focus();
    axios.get(`${SERVER_HOST}/products`).then((res) => {
      if (res.data) {
        if (res.data.errorMessage) {
          console.log(res.data.errorMessage);
        } else {
          console.log("Records read");
          this.setState({ productObject: res.data });
        }
      } else {
        console.log("Record not found");
      }
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const productObject = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      weight: this.state.weight,
      image: this.state.image,
      category: this.state.category,
    };

    axios
      .post(`${SERVER_HOST}/products`, productObject, {
        headers: { authorization: localStorage.token },
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            console.log("Record added");
            this.setState({ redirectToDisplayAllProducts: true });
          }
        } else {
          console.log("Record not added");
        }
      });
  };

  /// CODE TO SORT IN ASCENDING AND DESCENDING ORDER BY NAME///

  handleClick = (e) => {
    if (e.target.value === "Ascending") {
      /// SORT IN ASCENDING ORDER///
      this.setState({
        productObject: this.state.productObject.sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      });
    } else {
      /// SORT IN DESCENDING ORDER///
      this.setState({
        productObject: this.state.productObject.sort((a, b) =>
          b.name.localeCompare(a.name)
        ),
      });
    }
    console.log("sort by name");
  };

  render() {
    return (
      <div className="form-container">
        {this.state.redirectToDisplayAllProducts ? (
          <Redirect to="/DisplayAllProducts" />
        ) : null}



        <select id="alignAttractionFilter" onChange={this.handleClick}>
          <option value="Name list">Name List</option>
          <option value="Ascending">A-Z</option>
          <option value="Descending">Z-A</option>
        </select>
      </div>
    );
  }
}