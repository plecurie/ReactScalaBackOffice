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

        }

        setIsAuthenticating(false);
    }

    return !isAuthenticating &&
        <div className="App">
            <AppContext.Provider value={{isAuthenticated, userHasAuthenticated}}>
                <Routes/>
            </AppContext.Provider>
        </div>;

}

export default App;
