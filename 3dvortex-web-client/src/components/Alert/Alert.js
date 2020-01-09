import React from 'react';

export const ALERT_TYPES = {
  WARNING: 'alert-warning',
  PRIMARY: 'alert-primary',
  SECONDARY: 'alert-secondary',
  SUCCESS: 'alert-success',
  DANGER: 'alert-danger',
  INFO: 'alert-info',
  LIGHT: 'alert-light',
  DARK: 'alert-dark',
}


const Alert = (props) => {

    return (
        <div className={`m-2 alert ${ALERT_TYPES[props.messageType]} alert-dismissible fade ${props.display ? 'show' : 'd-none'}`} role="alert">
          {props.message}
          <button type="button" className="close" aria-label="Close" onClick={props.handleCloseAlert}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
    );
}

export default Alert;
