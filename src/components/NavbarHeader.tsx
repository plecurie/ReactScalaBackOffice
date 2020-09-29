import React from "react";
import {useHistory} from "react-router-dom";
// @ts-ignore
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/images/logo.svg";
import {authService} from "../services/Authentication.service";
import {useAppContext} from "../libs/contextLib";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

export const NavbarHeader = () => {

    const { userHasAuthenticated }: any = useAppContext();
    const history = useHistory();

    return (
        <Container>
        <Navbar collapseOnSelect expand="lg" variant="dark">
            <Navbar.Brand href='#' onClick={()=> {
                userHasAuthenticated(true);
                history.push("/home")
            }}>
                <img
                    alt=""
                    src={logo}
                    width="40"
                    height="40"
                    className="d-inline-block align-text-top"
                />{'#CleanMyShare'}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse/>
            <Navbar.Collapse/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav fill variant="pills" className="justify-content-end">

                        <LinkContainer to="/dashboard/explorer">
                            <Nav.Link > Exploration </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/dashboard/products">
                            <Nav.Link> Fonds </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/dashboard/contracts">
                            <Nav.Link> Contrats </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/dashboard/import">
                            <Nav.Link >Import </Nav.Link>
                        </LinkContainer>

                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link >
                        <Button variant={'outline-info'}
                                onClick={() => {
                                    authService.logout(() => {
                                        userHasAuthenticated(false);
                                        history.push("/login")
                                    });
                                }}
                        >
                            Se déconnecter
                        </Button>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>





        </Navbar>
        </Container>

    );


};
