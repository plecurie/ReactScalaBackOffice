import React from "react";

// @ts-ignore
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {auth} from "../services/Authentication.service";
import {withRouter} from "react-router";

export const NavbarHeader = withRouter(({ history}) => {

    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/home">CleanMyShare</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/dashboard/products">Funds</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard/contracts">Contracts</NavDropdown.Item>
                        <NavDropdown.Item href="/dashboard/buylist">Buylists</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/import">Import</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>
                        <Button variant={'outline-info'}
                            onClick={() => {
                                auth.signout(() => history.push("/login"));
                            }}
                        >
                            Sign out
                        </Button>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );


});
