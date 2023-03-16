import React, { Component } from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";
 import { Container, Nav, Navbar } from "react-bootstrap";
import { ACCESS_LEVEL_GUEST } from "../config/global_constants";

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: true };
    }
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        const isAuthenticated = localStorage.accessLevel > ACCESS_LEVEL_GUEST;
        const testLinks = (
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="#login">Mark Otto</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
        const authLinks = (
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/orders">Orders</Nav.Link>
                <Nav.Link href="/cart"><img className="shopping-cart-icon" src= {require(`../Image/shopping_cart.png`)}   alt=""/></Nav.Link>
             

                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <strong>
                            {localStorage.name ? `Welcome ${localStorage.name}` : ""}
                        </strong>
                        {localStorage.profilePhoto !== "null" ? ( <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`}  style={{ width: "70px", height: "60px" }}/>) : null}
                    </Navbar.Text>
                    <span>&#160;&#160;</span>
                    <Logout />
                </Navbar.Collapse>

            </Nav>
        );

        const guestLinks = (
            <Nav className="me-auto">
                <Nav.Link href={"/Register"}><a>Register</a></Nav.Link>
                <Nav.Link href={"/Login"}><a>Login</a></Nav.Link>
                <Nav.Link href={"/ResetDatabase"}><a><img className="shopping-cart-icon" src= {require(`../Image/shopping_cart.png`)}   alt=""/></a></Nav.Link>
            </Nav>
        );

        return (
            <>
                <Navbar bg="dark" variant="dark" fixed="top">
                    <div className="container-fluid">
                       
                        <div className="topnav">
                <img className="hp" src= {require(`../Image/Callaghans-Butchers-logo-lrg.png`)}   alt=""/>
                
                {/* <a href="Home">Home</a> */}
              </div>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </Navbar>
                <br/><br/><br/>
            </>
        );
    }
}
