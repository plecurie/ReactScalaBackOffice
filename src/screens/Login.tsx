import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import '../assets/css/Login.css';
import logo from "../assets/images/logo.svg";
import {useAppContext} from "../libs/contextLib";
import {authService} from "../services/Authentication.service";
import {Form, Button, FormGroup, Row} from "react-bootstrap";
import {AccountCircle, VpnKey} from "@material-ui/icons";

export const Login = () => {

    const { userHasAuthenticated }: any = useAppContext();
    const history = useHistory();

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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await authService.signin(username, password, () => {
            userHasAuthenticated(true);
            history.push("/");
        });
    };

    const handleKeyPress = (e:any) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleSubmit(e);
        }
    };

    return (
        <>
            <header className="Login-header"/>
            <body className="Login-body">
                <img src={logo} className="Login-logo" alt="logo" />
                <FormGroup controlId="email">
                    <br/>
                    <Row>
                        <AccountCircle style={{ fontSize: 50 }} />
                        <Form.Control
                            className="Login-form"
                            type="email"
                            placeholder="Entrer email"
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={(e: any) => handleKeyPress(e)}
                            style={{marginLeft: 10}}
                        />
                    </Row>
                </FormGroup>
                <br/>
                <FormGroup controlId="password" >
                    <Row>
                        <VpnKey style={{ fontSize: 50 }} />
                        <Form.Control
                            className="Login-form"
                            type="password"
                            placeholder="Entrer mot de passe"
                            onChange={(e)=>setPassword(e.target.value)}
                            onKeyPress={(e: any)=>handleKeyPress(e)}
                            style={{marginLeft: 10}}
                        />
                    </Row>
                </FormGroup>
                <br/>
                <Button
                    className="Login-button"
                    onClick={(e: any) => handleSubmit(e)}
                    disabled={isButtonDisabled}>
                    Se Connecter</Button>
            </body>
        </>
    )
};
