import React from "react";
// @ts-ignore
import {Button, Container, Nav, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import {auth} from "../services/Authentication.service";
import {useHistory} from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {useAppContext} from "../libs/contextLib";

export const NavbarHeader = () => {

    const { userHasAuthenticated }: any = useAppContext();
    const history = useHistory();

    return (
        <Container>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <LinkContainer to="/home">
                <NavbarBrand>CleanMyShare </NavbarBrand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
                        <LinkContainer to="/dashboard/products">
                            <NavDropdown.Item > Funds </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/dashboard/contracts">
                            <NavDropdown.Item > Contracts </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/dashboard/buylists">
                            <NavDropdown.Item > Buylists </NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <LinkContainer to="/import">
                        <Nav.Link >Import </Nav.Link>
                    </LinkContainer>
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
        </Container>
    );


};
