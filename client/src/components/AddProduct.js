import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
// import Form from "react-bootstrap/Form"
import AppNavbar from "./AppNavbar";
import axios from "axios"

import LinkInClass from ".//LinkInClass"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class AddProduct extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            name:"",
            description:"",
            price:"",
            weight:"",
            image:"",
            category:"",
            selectedFile:[],
            redirectToDisplayAllProducts:localStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }
 
 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }

    handleFileChange = (e) =>
    {
        this.setState({selectedFile: e.target.files})
  
    }


    handleSubmit = (e) => 
    {
        e.preventDefault()

        const productObject = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            weight: this.state.weight,
            image: [],
            category: this.state.category
        };

        let arr = Array.from(this.state.selectedFile)
        arr.forEach((file) => {
          productObject.image.push(file.name)
        })
    
        if(this.state.selectedFile.length < 1) {
            alert("Please select a file to upload")
            return;
        }


        if(this.state.name.length<1)
        {
            alert("Please give a name to the product")
            return;
        }

        if(this.state.description.length<1)
        {
            alert("Please give a description to the product")
            return;
        }

        if(this.state.price.length<1)
        {
            alert("Please give the price to the product")
            return;
        }

        if(this.state.weight.length<1)
        {
            alert("Please give the weight to the product")
            return;
        }

        if(this.state.category.length<1)
        {
            alert("Please give the category (ex: beef, pork, lamb) to the product")
            return;
        }





        console.log(productObject.image)
        axios.post(`${SERVER_HOST}/products`, productObject, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {   
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {   
                    console.log("Record added")
                    this.setState({redirectToDisplayAllProducts:true})
                } 
            }
            else
            {
                console.log("Record not added")
            }
        })
    }


    render()
    {        
        return (
            <>
                <AppNavbar/>
            <div className="form-container"> 
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/DisplayAllProducts"/> : null}                                            
                    
                {/*<Form>*/}
                {/*    <Form.Group controlId="name">*/}
                {/*        <Form.Label>Name</Form.Label>*/}
                {/*        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />*/}
                {/*    </Form.Group>*/}

                {/*    <Form.Group controlId="description">*/}
                {/*        <Form.Label>Description</Form.Label>*/}
                {/*        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleChange} />*/}
                {/*    </Form.Group>*/}

                {/*    <Form.Group controlId="price">*/}
                {/*        <Form.Label>Price</Form.Label>*/}
                {/*        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />*/}
                {/*    </Form.Group>*/}

                {/*    <Form.Group controlId="weight">*/}
                {/*        <Form.Label>Weight</Form.Label>*/}
                {/*        <Form.Control type="text" name="weight" value={this.state.weight} onChange={this.handleChange} />*/}
                {/*    </Form.Group> */}

                {/*    <Form.Group controlId="image">*/}
                {/*        <Form.Label>Image</Form.Label>*/}
                {/*        <Form.Control type="file" name="image"  onChange={this.handleFileChange} multiple= {true} />*/}
                {/*    </Form.Group>*/}

                {/*    <Form.Group controlId="category">*/}
                {/*        <Form.Label>Category</Form.Label>*/}
                {/*        <Form.Control type="text" name="category" value={this.state.category} onChange={this.handleChange} />*/}
                {/*    </Form.Group>*/}

                {/*    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>            */}

                {/*    <Link className="red-button" to={"/DisplayAllProducts"}>Cancel</Link>*/}
                {/*</Form>*/}

                {/*<form>*/}
                {/*    <div className="form-group" id="name">*/}
                {/*        <label htmlFor="name">Name</label>*/}
                {/*        <input ref={(input) => {*/}
                {/*            this.inputToFocus = input*/}
                {/*        }} type="text" name="name" value={this.state.name} onChange={this.handleChange}*/}
                {/*               className="form-control"/>*/}
                {/*    </div>*/}

                {/*    <div className="form-group" id="description">*/}
                {/*        <label htmlFor="description">Description</label>*/}
                {/*        <input type="text" name="description" value={this.state.description}*/}
                {/*               onChange={this.handleChange} className="form-control"/>*/}
                {/*    </div>*/}

                {/*    <div className="form-group" id="price">*/}
                {/*        <label htmlFor="price">Price</label>*/}
                {/*        <input type="text" name="price" value={this.state.price} onChange={this.handleChange}*/}
                {/*               className="form-control"/>*/}
                {/*    </div>*/}

                {/*    <div className="form-group" id="weight">*/}
                {/*        <label htmlFor="weight">Weight</label>*/}
                {/*        <input type="text" name="weight" value={this.state.weight} onChange={this.handleChange}*/}
                {/*               className="form-control"/>*/}
                {/*    </div>*/}

                {/*    <div className="form-group" id="image">*/}
                {/*        <label htmlFor="image">Image</label>*/}
                {/*        <input type="file" name="image" onChange={this.handleFileChange} multiple={true}*/}
                {/*               className="form-control"/>*/}
                {/*    </div>*/}

                {/*    <div className="form-group" id="category">*/}
                {/*        <label htmlFor="category">Category</label>*/}
                {/*        <input type="text" name="category" value={this.state.category} onChange={this.handleChange}*/}
                {/*               className="form-control"/>*/}
                {/*    </div>*/}

                {/*    <button type="button" className="green-button" onClick={this.handleSubmit}>Add</button>*/}

                {/*    <a href="/DisplayAllProducts" className="red-button">Cancel</a>*/}
                {/*</form>*/}








                <form>
                    <div className="form-group" id="name">
                        <label htmlFor="name">Name</label>
                        <input
                            ref={(input) => {
                                this.inputToFocus = input;
                            }}
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group" id="description">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group" id="price">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            name="price"
                            min="0"
                            step="0.01"
                            value={this.state.price}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group" id="weight">
                        <label htmlFor="weight">Weight</label>
                        <input
                            type="number"
                            name="weight"
                            min="0"
                            step="0.01"
                            value={this.state.weight}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group" id="image">
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={this.handleFileChange}
                            multiple={true}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group" id="category">
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={this.state.category}
                            onChange={this.handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <button type="submit" className="green-button" onClick={this.handleSubmit}>
                        Add
                    </button>

                    <a href="/DisplayAllProducts" className="red-button">
                        Cancel
                    </a>
                </form>




            </div>

                </>
        )
    }
}
