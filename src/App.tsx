import React, {useEffect, useState} from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes} from "./routes";
import {AppContext} from "./libs/contextLib";
import {Auth} from "aws-amplify";


function App() {

    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                //alert(e);
            }
        }

        setIsAuthenticating(false);
    }
/*
    const AuthBar = () => {
        return (isAuthenticated
            ? ( <p style={{backgroundColor:'green', minHeight:'30px', fontWeight:'bold'}}> Welcome! </p>)
            : ( <p style={{backgroundColor:'orangered', minHeight:'30px', fontWeight:'bold'}}> You are not logged in. </p>))
    };
*/

    return !isAuthenticating &&
        <div className="App">
            <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
                <Routes/>
            </AppContext.Provider>
        </div>;

}

export default App;
