import React, {Component} from 'react';
import UsersList from "./components/usersList";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./components/loginPage";
import SignIn from "./components/signIn";
import Header from "./components/header/header";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/signin" exact component={SignIn}/>
                    <Route path="/" exact component={UsersList}/>
                    <Route path="/header" exact component={Header}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
