import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {Redirect, Link} from "react-router-dom";
import axios from "axios";
import AppNavbar from "./AppNavbar";
import LinkInClass from "./LinkInClass";

// import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants";
import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

export default class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ``,
      description: ``,
      price: ``,
      weight: ``,
      image: ``,
      category: ``,
      selectedFile:[],
      redirectToDisplayAllCars:localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER
    };
  }

  componentDidMount() {
    this.inputToFocus.focus();

    axios
      .get(`${SERVER_HOST}/products/${this.props.match.params.id}`, {
        headers: {"authorization": localStorage.token},
      })
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            this.setState({
              name: res.data.name,
              description: res.data.description,
              price: res.data.price,
              weight: res.data.weight,
              image: res.data.image,
              category: res.data.category,
            });
          }
        } else {
          console.log(`Record not found`);
        }
      });
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  
  handleFileChange = (e) =>
  {
      this.setState({selectedFile: e.target.files})

  }


  handleSubmit = (e) => {
    e.preventDefault();

    const productObject = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      weight: this.state.weight,
      image: [],
      category: this.state.category,
    };

    let arr = Array.from(this.state.selectedFile)
    arr.forEach((file) => {
      productObject.image.push(file.name)
    })

    if(this.state.selectedFile.length < 1) {
      alert("Please select a file to upload")
      return;
  }

    console.log(productObject.image)


    axios
      .put(
        `${SERVER_HOST}/products/${this.props.match.params.id}`,
        productObject,
        {headers: {"authorization": localStorage.token}}
      )
      .then((res) => {
        if (res.data) {
          if (res.data.errorMessage) {
            console.log(res.data.errorMessage);
          } else {
            console.log(`Record updated`);
            this.setState({redirectToDisplayAllProducts: true});
          }
        } else {
          console.log(`Record not updated`);
        }
      });
  };

  render() {
    return (
        <>
          <AppNavbar />
      <div className="form-container">
        {this.state.redirectToDisplayAllProducts ? (
          <Redirect to="/DisplayAllProducts" />
        ) : null}

        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              ref={(input) => {
                this.inputToFocus = input;
              }}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="weight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="text"
              name="weight"
              value={this.state.weight}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              // name="image"
              // value={this.state.image}
              onChange={this.handleFileChange} multiple= {true}

            />

              </Form.Group>
              <Form.Group controlId="category">
            <Form.Label>Catergory</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
              />
              </Form.Group>
              <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>  
    
              <Link className="red-button" to={"/DisplayAllProducts"}>Cancel</Link>

              </Form>
            </div>
        </>
        )
    }
}