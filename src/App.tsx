import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import Row from "react-bootstrap/Row";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Redirect
} from 'react-router-dom'

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100) // fake async
    }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);

const Home = () => <h3>Home</h3>;

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    };
    login = () => {
        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: true
            }))
        })
    };
    render() {
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true || fakeAuth.isAuthenticated === true) {
            return <Redirect to='/home' />
        }

        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                <FormGroup controlId="email">
                    <br/>
                    <Row>
                        <Form.Label>Email address</Form.Label>
                    </Row>
                    <Row>
                        <Form.Control className="App-form" type="email" placeholder="Enter email" />
                    </Row>
                </FormGroup>
                <br/>
                <FormGroup controlId="password" >
                    <Row>
                        <Form.Label>Password</Form.Label>
                    </Row>
                    <Row>
                        <Form.Control className="App-form" type="password" placeholder="Password" />
                    </Row>
                </FormGroup>
                <Button className="App-button" onClick={this.login}>Log in</Button>
                </header>
            </div>
        )
    }
}


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
