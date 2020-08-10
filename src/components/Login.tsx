import React, {useEffect, useState} from "react";
import logo from "../assets/images/logo.svg";
import {auth} from "../services/Authentication.service";
import {Redirect} from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Row from "react-bootstrap/Row";
import '../assets/css/Login.css';

export const Login = (props: any) => {

    const { from } = props.location.state || { from: { pathname: "/home" } };
    const [redirect, setRedirect] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (username.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, password]);

    const handleSubmit = () => {
        auth.signin(() => {
            alert(auth.isAuthenticated);
            setRedirect(true);
        })
    };

    const handleKeyPress = (e:any) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleSubmit();
        }
    };

    if (redirect === true || auth.isAuthenticated === true) {
        return <Redirect to={from} />
    }

    return (
        <div>
            <header className="Login-header"/>
            <body className="Login-body">
                <img src={logo} className="Login-logo" alt="logo" />
                <FormGroup controlId="email">
                    <br/>
                    <Row>
                        <Form.Label>Email address</Form.Label>
                    </Row>
                    <Row>
                        <Form.Control
                            className="Login-form"
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={(e: any) => handleKeyPress(e)}
                        />
                    </Row>
                </FormGroup>
                <br/>
                <FormGroup controlId="password" >
                    <Row>
                        <Form.Label>Password</Form.Label>
                    </Row>
                    <Row>
                        <Form.Control
                            className="Login-form"
                            type="password"
                            placeholder="Password"
                            onChange={(e)=>setPassword(e.target.value)}
                            onKeyPress={(e: any)=>handleKeyPress(e)}
                        />
                    </Row>
                </FormGroup>
                <br/>
                <Button
                    className="Login-button"
                    onClick={() => handleSubmit()}
                    disabled={isButtonDisabled}>
                    Log in</Button>
            </body>
        </div>
    )
};
