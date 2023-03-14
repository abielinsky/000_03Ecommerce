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
                <Nav.Link href="/cart">Cart</Nav.Link>
                <Nav.Link href="/orders">Orders</Nav.Link>

                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <strong>
                            {localStorage.name ? `Welcome ${localStorage.name}` : ""}
                        </strong>
                        {/* {localStorage.profilePhoto !== "null" ? ( <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`}  style={{ width: "125px", height: "100px" }}/>) : null} */}
                    </Navbar.Text>
                    <span>&#160;&#160;</span>
                    <Logout />
                </Navbar.Collapse>

            </Nav>
        );

        const guestLinks = (
            <Nav className="me-auto">
                <Nav.Link href={"/Register"}>Register</Nav.Link>
                <Nav.Link href={"/Login"}>Login</Nav.Link>
                <Nav.Link href={"/ResetDatabase"}>Reset db</Nav.Link>
            </Nav>
        );

        return (
            <>
                <Navbar bg="dark" variant="dark" fixed="top">
                    <div className="container-fluid">
                        <Navbar.Brand href="/">E-Commerce Store</Navbar.Brand>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </Navbar>
                <br/><br/><br/>
            </>
        );
    }
}
