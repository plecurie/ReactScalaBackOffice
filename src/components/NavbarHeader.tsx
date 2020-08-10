import React from "react";
// @ts-ignore
import {Button, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {auth} from "../services/Authentication.service";
import {Link, useHistory} from "react-router-dom";
import {useAppContext} from "../libs/contextLib";

export const NavbarHeader = () => {

    const { userHasAuthenticated }: any = useAppContext();
    const history = useHistory();

    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>
                <Link to="/home">CleanMyShare</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
                        <NavDropdown.Item>
                            <Link to="/dashboard/products"> Funds </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/dashboard/contracts">Contracts </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to="/dashboard/buylists">Buylists </Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link>
                        <Link to="/import">Import </Link>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>
                        <Button variant={'outline-info'}
                            onClick={() => {
                                auth.logout(() => {
                                    userHasAuthenticated(false);
                                    history.push("/login")
                                });
                            }}
                        >
                            Log out
                        </Button>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );


};
