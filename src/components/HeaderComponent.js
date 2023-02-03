import React from 'react';
import { NavDropdown, Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

// Keycloak configs
import Keycloak from "keycloak-js";
import { useKeycloak } from '@react-keycloak/web'

function HeaderComponent(props) {

    // Set current keycloak after auhtorization
    const { keycloak, initialized } = useKeycloak()

    return (
        <div>
            {/* removed bg="light" and customized css instead */}
            <Navbar className="main-navbar-outer" expand="lg">
                <Container className="main-navbar-inner">
                    <Navbar.Brand href="#home">Car Rental</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown className="nav-item" title="Home" id="home-nav-dropdown">
                                <NavDropdown.Item href="/">Welcome</NavDropdown.Item>
                                <NavLink className="nav-item nav-item-thin" to="/admininfo">Admin Info</NavLink>
                                <NavDropdown.Item onClick={function signout() {
                                    keycloak.logout({
                                        "redirectUri": "http://localhost:3000"
                                    })
                                    // keycloak.logout();
                                }} > Signout
                                </NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown className="nav-item" title="Cars" id="cars-nav-dropdown">
                                {/* Change from href-navs to navlinks for real SPA, without page reloading: */}
                                {/* <NavDropdown.Item href="/allcars">All Cars</NavDropdown.Item> */}
                                <NavLink className="nav-item" to="/allcars">All Cars</NavLink>

                                <NavDropdown.Divider />
                                {/* <NavDropdown.Item href="/minicars">Mini</NavDropdown.Item> */}
                                <NavLink className="nav-item" to="/minicars">Mini</NavLink><br></br>
                                <NavLink className="nav-item" to="/sedancars">Sedan</NavLink><br></br>
                                <NavLink className="nav-item" to="/sportcars">Sport</NavLink><br></br>
                                <NavLink className="nav-item" to="/cabcars">Cab</NavLink><br></br>
                                <NavLink className="nav-item" to="/suvcars">Suv</NavLink><br></br>
                                <NavLink className="nav-item" to="/buscars">Bus</NavLink>
                            </NavDropdown>

                            <NavLink className="nav-item single-nav-item" to="/addcar">Add Car</NavLink>

                            <NavLink className="nav-item single-nav-item" to="/customers">Customers</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    );
}

export default HeaderComponent;