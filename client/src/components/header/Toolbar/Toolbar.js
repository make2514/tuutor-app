import React from 'react';
import { withRouter } from 'react-router-dom';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const toolbar = props => {
    

    function goToPage(event, path) {
        event.preventDefault();
        props.history.push(path);
    }
    


    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__toggle-button">
                    <DrawerToggleButton click={props.drawerClickHandler} />
                </div>
                <div className="toolbar__logo"><a onClick={(event) => goToPage(event, '/ticketfeed')}>TUUTOR</a></div>
                <div className="spacer" />
                <div className="toolbar_navigation-items">
                    {
                        props.history.location.pathname  === "/profile" || 
                        props.history.location.pathname  === "/register" ? null : 
                        <ul>
                            <li><a onClick={(event) => goToPage(event, '/profile')} >Profile</a></li>
                        </ul>
                    }
                </div>
            </nav>
        </header>);
    };

export default withRouter(toolbar);
