import React from 'react';

const SearchIcon = (props) => {
    return (
        <a href={props.link} className="link-unstyled">
          <i className="fa fa-search"></i>
        </a>
    );
}

export default SearchIcon;
