import {Redirect, Route, useLocation} from "react-router";
import {Login} from "./screens/Login";
import {Home} from "./screens/Home";
import {Products} from "./screens/Products";
import {Contracts} from "./screens/Contracts";
import {Buylists} from "./screens/Buylists";
import {Import} from "./screens/Import";
import {BrowserRouter as Router} from "react-router-dom";
import React from "react";
import {useAppContext} from "./libs/contextLib";

// @ts-ignore
const AuthenticatedRoute = ({ children, ...rest }) => {

    const { pathname, search } = useLocation();
    const { isAuthenticated }: any = useAppContext();
    return (
        <Route {...rest}>
            {isAuthenticated ? (
                children
            ) : (
                <Redirect to={
                    `/login?redirect=${pathname}${search}`
                } />
            )}
        </Route>
    );
};

function querystring(name: string, url = window.location.href) {
    name = name.replace(/[[]]/g, "\\$&");

    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return "";
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// @ts-ignore
const UnauthenticatedRoute = ({children, ...rest }) => {
    const { isAuthenticated }: any = useAppContext();
    const redirect = querystring('redirect');
    return (
        <Route {...rest}>
            {!isAuthenticated ? (
                children
            ) : (
                <Redirect to={redirect === "" || redirect === null ? "/home" : redirect} />
            )}
        </Route>
    );
};



export const Routes = () => {
    return (
        <Router>
            <div>
                <UnauthenticatedRoute exact path="/"><Redirect to="/home" /></UnauthenticatedRoute>
                <UnauthenticatedRoute exact path="/login"><Login /></UnauthenticatedRoute>
                <AuthenticatedRoute exact path='/home'><Home /></AuthenticatedRoute>
                <AuthenticatedRoute exact path='/dashboard/products' ><Products /></AuthenticatedRoute>
                <AuthenticatedRoute exact path='/dashboard/contracts'><Contracts /></AuthenticatedRoute>
                <AuthenticatedRoute exact path='/dashboard/buylists'><Buylists /></AuthenticatedRoute>
                <AuthenticatedRoute exact path='/import'><Import /></AuthenticatedRoute>
            </div>
        </Router>
    )
};
