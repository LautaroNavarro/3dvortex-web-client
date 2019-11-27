import React from 'react';

const DropDownItem = (props) => {
    return (
      <a className="dropdown-item" href="/">
        {props.children}
      </a>
    );
}

export default DropDownItem;
