import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {auth} from "./services/Authentication.service";

const AuthBar = () => {
    return (auth.isAuthenticated
        ? ( <p style={{backgroundColor:'lemongreen', minHeight:'30px', fontWeight:'bold'}}> Welcome! </p>)
        : ( <p style={{backgroundColor:'orangered', minHeight:'30px', fontWeight:'bold'}}> You are not logged in. </p>))
};

function App() {
    return (
        <div className="App">
            <Router>
                <AuthBar/>
                <Routes />
            </Router>
        </div>

    );
}

export default App;
