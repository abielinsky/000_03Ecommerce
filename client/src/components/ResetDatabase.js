import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class ResetDatabase extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {   
            isReset:false
        } 
    }
    
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    

    resetUsersModel = () =>
    {
        axios.post(`${SERVER_HOST}/users/reset_user_collection`)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully reset the User collection
                { 
                    console.log("User collection reset")
                    
                    localStorage.clear()
                }        
            }
            else
            {
                console.log("Failed to reset User collection")
            }
            
            this.setState({isReset:true})
        })   
    }



    render() 
    { 
        return (
            <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">

               {this.state.isReset ? <Redirect to="/DisplayAllCars"/> : null} 

                <p>"Reset User Database" is only for testing purposes.<br/>All code on the client-side and server-side relating to resetting the database should be removed from any development release</p>
                <LinkInClass value="Reset User Database" className="red-button" onClick={this.resetUsersModel}/> <br/><br/>
                <p>Reset the database and set up an administrator with:<br/> * email <strong>admin@admin.com</strong><br/> * password <strong>123!"£qweQWE</strong></p>        
            
                <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
            </form>
        )
    }
}