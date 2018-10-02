import React, {Component} from 'react';
import UsersList from "./components/usersList";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./components/loginPage";
import SignIn from "./components/signIn";
import TicketFeed from './components/ticketFeed/ticketFeed';
import Register from "./components/registerPage";

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
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
