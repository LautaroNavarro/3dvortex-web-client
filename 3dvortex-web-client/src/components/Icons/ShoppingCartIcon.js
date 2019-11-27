import React from 'react';

const ShoppingCartIcon = (props) => {
    return (
        <a href={props.link} className="link-unstyled">
          <i className="fas fa-shopping-cart"></i>
        </a>
    );
}

export default ShoppingCartIcon;
