import { NavLink, Outlet } from "react-router-dom";
import "./style.scss"
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DOElogo from './nycps-logo.png'
import nagarroLogo from "./Nagarro Logo Horizontal.png";
import {useLocation} from 'react-router-dom';

function BasicExample() {
    const url = 'https://nagarro.com';
    const [username, setUsername] = useState("");
    const location = useLocation();

    useEffect(() => {

    const items = localStorage.getItem('user');
    if (items) {
        setUsername(items);
    }

      }, [location.state]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container className="logo mainNavHolder">
            <Navbar.Brand href="">
                <div className="logoContainer">
                    <img
                        src={nagarroLogo}
                        width="140"
                        height="45"
                        className="d-inline-block align-top nagarro"
                        alt="NYCPB logo"
                    />
                    <img
                        src={DOElogo}
                        width="165"
                        height="30"
                        className="d-inline-block align-top DOE"
                        alt="NYCPB logo"
                    />
                </div>
            </Navbar.Brand>
            <Navbar.Brand href="">AI Assistant</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {<Nav.Link href="admin"><div> {username == "" ? "Log In" : username} </div></Nav.Link>}
                </Nav>
            </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
function Layout()
{
    return (
        <div className="root-layout">
            <BasicExample></BasicExample>
            <div className="root-container">
                <Outlet />
            </div>
        </div>
    )
}
export default Layout;
