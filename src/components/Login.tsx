import React from "react";
import logo from "../assets/images/logo.svg";
import {auth} from "../services/Authentication.service";
import {
    Link,
    Route,
    Redirect
} from 'react-router-dom'
import '../assets/css/App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Row from "react-bootstrap/Row";

export class Login extends React.Component {
    state = {
        redirect: false
    };
    login = () => {
        auth.authenticate(() => {
            this.setState(() => ({
                redirect: true
            }))
        })
    };
    render() {
        const { redirect } = this.state;

        if (redirect === true || auth.isAuthenticated === true) {
            return <Redirect to='/home' />
        }

        return (
            <div>
                <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        <FormGroup controlId="email">
            <br/>
            <Row>
                <Form.Label>Email address</Form.Label>
        </Row>
        <Row>
        <Form.Control className="App-form" type="email" placeholder="Enter email" />
        </Row>
        </FormGroup>
        <br/>
        <FormGroup controlId="password" >
        <Row>
            <Form.Label>Password</Form.Label>
        </Row>
        <Row>
        <Form.Control className="App-form" type="password" placeholder="Password" />
            </Row>
            </FormGroup>
            <Button className="App-button" onClick={this.login}>Log in</Button>
            </header>
            </div>
    )
    }
}
