import React from 'react';
import './assets/css/App.css';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Redirect
} from 'react-router-dom'
import {auth} from "./services/Authentication.service";
import {Login} from "./components/Login";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);

const Home = () => <h3>Home</h3>;

function App() {
  return (
      <Router>
          <div>
              <Route exact path="/"> <Redirect to="/home" /></Route>
              <Route path="/login" component={Login} />
              <PrivateRoute path='/home' component={Home} />
          </div>
      </Router>
  );
}

export default App;
