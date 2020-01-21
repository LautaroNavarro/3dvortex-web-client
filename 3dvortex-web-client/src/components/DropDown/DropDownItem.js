import React from 'react';
import classes from '../NavBar/components/NavBar.module.css';

const DropDownItem = (props) => {
    return (
      <a className={ `dropdown-item ${classes.clickable}`} href={props.link} onClick={props.onClickHandler}>
        {props.children}
      </a>
    );
}

export default DropDownItem;
