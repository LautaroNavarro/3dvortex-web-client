import React, {PureComponent} from 'react';
import classes from './Modal.module.css';

class SimpleModal extends PureComponent {

    render () {
        return (
          <div className={ classes.modal }>
            <div className={classes.modalContent}>
              <span className={classes.close} onClick={()=>this.props.handleClickClose()}>&times;</span>
              {this.props.children}
            </div>
          </div>
        );
    }
}

export default SimpleModal;
