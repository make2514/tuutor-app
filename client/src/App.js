import React, {Component} from 'react';
import UsersList from "./components/usersList";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./components/loginPage";
import SignIn from "./components/signIn";
import TicketFeed from './components/ticketFeed/ticketFeed';
import Register from "./components/registerPage";
import Header from "./components/header/header";
import Profile from "./components/profile/profilePage";
import Avatar from "./components/profile/avatar";
import CreateProfile from "./components/profile/createProfile";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={LoginPage}/>
                    <Route path="/signin" exact component={SignIn}/>
                    <Route path="/ticketfeed" exact component={TicketFeed}/>
                    <Route path="/" exact component={UsersList}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/header" exact component={Header}/>
                    <Route path ="/profile" exact component={Profile}/>
                    <Route path ="/createProfile" exact component={CreateProfile}/>
                    <Route path ="/avatar" exact component={Avatar}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
