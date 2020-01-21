import React, {PureComponent} from 'react';
import GeneralContext from '../../components/Layout/GeneralContext';


class OutlineSecondaryButton extends PureComponent {

    static contextType = GeneralContext;

    clickHandler = () => {
        if (this.props.url) {
          const { setRedirect } = this.context;
          setRedirect(this.props.url);
        } else if (this.props.handler) {
            this.props.handler();
        }

    }

  render () {
    return (
        <div className={`btn btn-outline-secondary ${this.props.className}`} onClick={ () => this.clickHandler() }>{this.props.text}</div>
    );
  }
}

export default OutlineSecondaryButton;
