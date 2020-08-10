import {Redirect, Route} from "react-router";
import {Login} from "./components/Login";
import {Home} from "./components/Home";
import {Products} from "./components/Products";
import {Contracts} from "./components/Contracts";
import {Buylists} from "./components/Buylists";
import {Import} from "./components/Import";
import {BrowserRouter as Router} from "react-router-dom";
import React from "react";
import {auth} from "./services/Authentication.service";

// @ts-ignore
const PrivateRoute = ({ component: Component, ...rest }) => {

    return(
        <Route {...rest} render={(props) => (
            auth.isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
        )} />
    )
};

export const Routes = () => {
    return (
        <Router>
            <div>
                <Route exact path="/"> <Redirect to="/home" /></Route>
                <Route path="/login" component={Login} />
                <PrivateRoute path='/home' component={Home} />
                <PrivateRoute path='/dashboard/products' component={Products} />
                <PrivateRoute path='/dashboard/contracts' component={Contracts} />
                <PrivateRoute path='/dashboard/buylists' component={Buylists} />
                <PrivateRoute path='/import' component={Import} />
            </div>
        </Router>
    )
};
