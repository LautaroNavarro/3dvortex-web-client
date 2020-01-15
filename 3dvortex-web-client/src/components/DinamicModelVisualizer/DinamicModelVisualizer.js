import React, {PureComponent} from 'react';
import StaticModelVisualizer from '../StaticModelVisualizer/StaticModelVisualizer';
import InteractiveModelVisualizer from '../InteractiveModelVisualizer/InteractiveModelVisualizer';

const STATIC_VISUALIZATION = 'STATIC_VISUALIZATION';
const INTERACTIVE_VISUALIZATION = 'INTERACTIVE_VISUALIZATION';

class DinamicModelVisualizer extends PureComponent {

	state = {
		visualize: STATIC_VISUALIZATION,
	}

	handleSwitch = (event) => {
		if (this.state.visualize === STATIC_VISUALIZATION) {
			this.setState({visualize: INTERACTIVE_VISUALIZATION});
		} else {
			this.setState({visualize: STATIC_VISUALIZATION});
		}
	}

	render() {
		return (
			<div className='text-center'>
				{ ( this.state.visualize === STATIC_VISUALIZATION ) ?
					<StaticModelVisualizer
						url={this.props.image.url}
						alt={this.props.image.alt}
					/> :
					<InteractiveModelVisualizer
						url={this.props.model.url}
					/>
				}
				<div className='btn btn-outline-dark btn-sm mt-2' onClick={() => this.handleSwitch()}>
					{ ( this.state.visualize === STATIC_VISUALIZATION ) ? 'Load 3d model' : 'Load image' }
				</div>
			</div>
		)
	}
}

export default DinamicModelVisualizer;
