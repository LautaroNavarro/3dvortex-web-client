import React from 'react';

const DropDownItem = (props) => {
    return (
      <a className="dropdown-item" href={props.link} onClick={props.onClickHandler}>
        {props.children}
      </a>
    );
}

export default DropDownItem;
