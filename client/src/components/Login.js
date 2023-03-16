import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import AppNavbar from "./AppNavbar";
import LinkInClass from ".//LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class Login extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            email:"",
            password:"",
            isLoggedIn:false,
            errorMessage: ""
        }
    }
        
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault(); // Prevent the default form submission behavior
        
        // Check if the email and password fields are not empty
        if (this.state.email.trim() === "" || this.state.password.trim() === "") {
            this.setState({errorMessage: "Please enter your email and password"});
            return;
        }
        
        // Check if the email is in a valid format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.state.email)) {
            this.setState({errorMessage: "Please enter a valid email address"});
            return;
        }
    
        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
        .then(res => 
        {               
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    this.setState({errorMessage: res.data.errorMessage}); 
                }
                else // user successfully logged in
                { 
                    console.log("User logged in")
                    
                    localStorage.name = res.data.name
                    localStorage.accessLevel = res.data.accessLevel
    
                    localStorage.profilePhoto = res.data.profilePhoto
                    localStorage.token = res.data.token
                    
                    this.setState({isLoggedIn:true})
                }        
            }
            else
            {
                this.setState({errorMessage: "Login failed"});
            }
        })                
    }


    render()
    {            
        return (
            <>
                <AppNavbar/>
            <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">
                <h7>Login</h7>
                
                {this.state.isLoggedIn ? <Redirect to="/DisplayAllProducts"/> : null} 
                
                <div className="form-group" >
                <input 
                    type = "email" 
                    name = "email" 
                    placeholder = "Email"
                    autoComplete="email"
                    value={this.state.email} 
                    onChange={this.handleChange}
                    className="form-control"
                />
                 </div><br/>
                    
                 <div className="form-group" >
                <input 
                    type = "password" 
                    name = "password" 
                    placeholder = "Password"
                    autoComplete="password"
                    value={this.state.password} 
                    onChange={this.handleChange}
                    className="form-control"
                />
                 </div><br/><br/>

                {this.state.errorMessage && <p className="error-message">{this.state.errorMessage}</p>}

                <LinkInClass value="Login" className="green-button" onClick={this.handleSubmit}/> 
                <Link className="red-button" to={"/DisplayAllProducts"}>Cancel</Link>                                      
            </form>
                </>
        )
    }
}