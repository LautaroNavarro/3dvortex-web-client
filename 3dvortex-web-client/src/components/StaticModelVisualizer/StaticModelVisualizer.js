import React, {PureComponent} from 'react';
import classes from './StaticModelVisualizer.module.css';

class StaticModelVisualizer extends PureComponent {

  render() {
    return (
      <div className={ `${classes.StaticModelVisualizer} text-center m-auto` } style={{
        'height': (this.props.height) ? this.props.height : '400px',
        'width': (this.props.width) ? this.props.width: '400px',
    }}>
        <img src={ this.props.url } alt={ this.props.alt } />
      </div>
    )
  }
}

export default StaticModelVisualizer;
