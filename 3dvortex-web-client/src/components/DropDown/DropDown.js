import React from 'react';

const DropDown = (props) => {
    return (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" data-toggle="dropdown">{props.name}</a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            {props.children}
          </div>
        </li>
      </ul>
    );
}

export default DropDown;
