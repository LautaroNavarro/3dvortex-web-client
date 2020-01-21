import React, {PureComponent} from 'react';
import GeneralContext from '../../components/Layout/GeneralContext';


class BlockOutlineSecondaryButton extends PureComponent {

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
        <div
          disabled={this.props.disabled}
          className={`btn btn-outline-secondary btn-block ${this.props.className}`}
          onClick={ () => this.clickHandler() }>
          {this.props.text }
        </div>
    );
  }
}

export default BlockOutlineSecondaryButton;
