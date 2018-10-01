import React from 'react';

import './SideDrawer.css';

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a href="/">Create Ticket</a>
        </li>
        <li>
          <a href="/">Edit Profile</a>
        </li>
        <li>
          <a href="/">Settings</a>
        </li>
        <li>
          <a href="/">Support</a>
        </li>
        <li>
          <a href="/signin">Log Out</a>
        </li>
      </ul>
    </nav>
  );
};

export default sideDrawer;
