import React, {PureComponent} from 'react';
import classes from './Spinner.module.css';

class Spinner extends PureComponent {

    render () {
        return (
          <div className={classes.modal + ' ' + classes.display}>
            <div className={classes.modalContent}>
              {this.props.children}
            </div>
          </div>
        );
    }
}

export default Spinner;
