import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import AppNavbar from "./AppNavbar";
import LinkInClass from "./LinkInClass";
import { SERVER_HOST } from "../config/global_constants";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      selectedFile: null,
      isRegistered: false,
      errors: {}, // new state to hold validation errors
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate(); // validate the form inputs

    if (Object.keys(errors).length === 0) { // if no errors, submit form data
      let formData = new FormData();
      formData.append("profilePhoto", this.state.selectedFile);

      axios
        .post(
          `${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`,
          formData,
          { headers: { "Content-type": "multipart/form-data" } }
        )
        .then((res) => {
          if (res.data) {
            if (res.data.errorMessage) {
              this.setState({ errors: { general: res.data.errorMessage } }); // set general error message
            } else {
              console.log("User registered and logged in");

              localStorage.name = res.data.name;
              localStorage.accessLevel = res.data.accessLevel;
              localStorage.profilePhoto = res.data.profilePhoto;
              localStorage.token = res.data.token;

              this.setState({ isRegistered: true });
            }
          } else {
            console.log("Registration failed");
          }
        });
    } else { // if there are errors, update the state with the errors object
      this.setState({ errors });
    }
  };

  // validation function to check form inputs
  validate = () => {
    let errors = {};

    if (this.state.name.trim() === "") {
      errors.name = "Name is required";
    }

    if (this.state.email.trim() === "") {
      errors.email = "Email is required";
    } else if (
      !/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(
        this.state.email
      )
    ) {
      errors.email = "Invalid email format";
    }

    if (this.state.password.trim() === "") {
      errors.password = "Password is required";
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[£!#€$%^&*])[0-9a-zA-Z£!#€$%^&*]{10,}/.test(
        this.state.password
      )
    ) {
      errors.password =
        "Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)";
    }

    if (this.state.confirmPassword.trim() === "") {
      errors.confirmPassword = "Please confirm your password";
    } else if (this.state.password !== this.state.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };


  render() 
  {
      const { name, email, password, confirmPassword } = this.state;
      const isNameValid = !!name.trim();
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[£!#€$%^&*])[A-Za-z\d£!#€$%^&*]{10,}$/.test(password);
      const isConfirmPasswordValid = password === confirmPassword;
      const isFormValid = isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
      
      return (
          <>
              <AppNavbar />
  
              <form className="form-container" noValidate={true} id="loginOrRegistrationForm">
  
                  {this.state.isRegistered ? <Redirect to="/DisplayAllProducts" /> : null}
  
                  <h7>New User Registration</h7>
  
                  <div className="form-group" >
                      <input
                          name="name"
                          type="text"
                          placeholder="Name"
                          autoComplete="name"
                          value={name}
                          onChange={this.handleChange}
                          ref={(input) => { this.inputToFocus = input }}
                          className="form-control"
                          required
                      />
                      {!isNameValid && <div className="error-message">Please enter your name</div>}
                    
                  </div>
  
                  <div className="form-group" >
                      <input
                          name="email"
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                          value={email}
                          onChange={this.handleChange}
                          className="form-control"
                          required
                      />
                      {!isEmailValid && <div className="error-message">Please enter a valid email address</div>}
                  </div>
  
                  <div className="form-group" >
                      <input
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="password"
                          title="Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                          value={password}
                          onChange={this.handleChange}
                          className="form-control"
                          required
                      />
                      {!isPasswordValid && <div className="error-message">Please enter a valid password (at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters: £!#€$%^&*)</div>}
                  </div>
  
                  <div className="form-group" >
                      <input
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm password"
                          autoComplete="confirmPassword"
                          value={confirmPassword}
                          onChange={this.handleChange}
                          className="form-control"
                          required
                      />
                      {!isConfirmPasswordValid && <div className="error-message">Please confirm your password</div>}
                  </div>
  
                  <div className="form-group" >
                      <input
                          type="file"
                          onChange={this.handleFileChange}
                          className="form-control"
                          required
                      />
                  </div>
  
                  <div className="form-buttons">
                      <LinkInClass
                          value="Register New User"
                          className={`green-button ${!isFormValid ? 'disabled' : ''}`}
                          onClick={this.handleSubmit}
                          disabled={!isFormValid}
                      />
                      <Link className="red-button" to={"/DisplayAllProducts"}>Cancel</Link>
                  </div>
  
              </form>
          </>
      )
  }}