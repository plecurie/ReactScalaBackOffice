import {Redirect, Route, useLocation} from "react-router";
import {Login} from "./components/Login";
import {Home} from "./components/Home";
import {Products} from "./components/Products";
import {Contracts} from "./components/Contracts";
import {Buylists} from "./components/Buylists";
import {Import} from "./components/Import";
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
