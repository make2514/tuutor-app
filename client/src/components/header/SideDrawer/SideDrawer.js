import React from 'react';
import { withRouter } from 'react-router-dom';
import './SideDrawer.css';

const sideDrawer = props => {
  function goToPage(event, path) {
    event.preventDefault();
    props.history.push(path);
  }

  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
        <a onClick={(event) => goToPage(event, '/createticket')} href="/">Create Ticket</a>
        </li>
        <li>
          <a onClick={(event) => goToPage(event, '/createProfile')} href="/">Edit Profile</a>
        </li>
        <li>
        <a onClick={(event) => goToPage(event, '/settings')} href="/">Settings</a>
        </li>
        <li>
        <a onClick={(event) => goToPage(event, '/support')} href="/">Support</a>
        </li>
        <li>
        <a onClick={(event) => goToPage(event, '/')} href="/">Log Out</a>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(sideDrawer);
