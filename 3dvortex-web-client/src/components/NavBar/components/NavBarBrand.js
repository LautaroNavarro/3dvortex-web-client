import React from 'react';
import classes from './NavBar.module.css';

const NavBarBrand = (props) => {
    return (
        <div className={ `navbar-brand ${classes.clickable}` } onClick={ props.handler }>
            {props.children}
        </div>
    );
}

export default NavBarBrand;