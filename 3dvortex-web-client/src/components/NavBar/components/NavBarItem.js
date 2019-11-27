import React from 'react';

const NavBarItem = (props) => {
    return (
        <li className="nav-item">
          <a className="nav-link create_account" href={props.link}>{props.children}</a>
        </li>
    );
}

export default NavBarItem;
