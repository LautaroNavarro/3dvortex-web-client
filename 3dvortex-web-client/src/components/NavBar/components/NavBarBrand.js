import React from 'react';

const NavBarBrand = (props) => {
    return (
        <div className="navbar-brand" href={props.link}>
            {props.children}
        </div>
    );
}

export default NavBarBrand;