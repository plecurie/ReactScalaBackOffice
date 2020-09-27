import React, {useEffect, useState} from "react";
import logo from "../assets/images/logo.svg";
import {authService} from "../services/Authentication.service";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Row from "react-bootstrap/Row";
import '../assets/css/Login.css';
import {useAppContext} from "../libs/contextLib";
import {useHistory} from "react-router-dom";
import {createStyles, Grid, TextField, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {AccountCircle, VpnKey} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    }),
);

export const Login = () => {

    const classes = useStyles();

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
