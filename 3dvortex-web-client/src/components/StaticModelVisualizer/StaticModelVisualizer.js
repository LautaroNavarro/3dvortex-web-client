import React, {PureComponent} from 'react';
import classes from './StaticModelVisualizer.module.css';

class StaticModelVisualizer extends PureComponent {

  render() {
    return (
      <div className={ classes.StaticModelVisualizer }>
        <img src={ this.props.url } alt={ this.props.alt } />
      </div>
    )
  }
}

export default StaticModelVisualizer;
