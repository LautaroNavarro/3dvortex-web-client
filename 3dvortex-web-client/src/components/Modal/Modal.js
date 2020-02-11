import React, {PureComponent} from 'react';
import classes from './Modal.module.css';

class Modal extends PureComponent {

  state = {
    display: true
  }

  handleClickClose () {
    this.setState({display:false});
    if (this.props.handleClickClose) {
      this.props.handleClickClose();
    }
  }

    render () {
        return (
          <div className={classes.modal + ' ' +  (this.state.display ? classes.display : classes.hide)}>
            <div className={classes.modalContent}>
              <span className={classes.close} onClick={()=>this.handleClickClose()}>&times;</span>
              {this.props.children}
            </div>
          </div>
        );
    }
}

export default Modal;
