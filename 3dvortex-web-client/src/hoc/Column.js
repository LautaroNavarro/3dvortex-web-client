import React from 'react';

const Column = (props) => {
    return (
        <div className={`col-${props.number}`}>
            {props.children}
        </div>
    );
}

export default Column;
