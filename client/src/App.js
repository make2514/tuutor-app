import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import './App.css';
import UsersList from "./components/usersList";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./components/loginPage";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/" exact component={UsersList}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
