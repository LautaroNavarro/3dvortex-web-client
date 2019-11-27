import React from 'react';

const NavBarItemList = (props) => {
    return (
      <ul className="navbar-nav">
        {props.children}
      </ul>
    );
}

export default NavBarItemList;