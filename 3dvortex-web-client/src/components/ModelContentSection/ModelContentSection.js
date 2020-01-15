import React, {Component} from 'react';
import GeneralContext from '../../components/Layout/GeneralContext';
import classes from './ModelContentSection.module.css';

class ModelContentSection extends Component {

    static contextType = GeneralContext;

    clickHandler = (modelId) => {
        const {setRedirect} = this.context;
        setRedirect(`models/${modelId}`);
    }
    render () {
        return (
            <div className={ `col-${this.props.colNumber}` } onClick={ () => this.clickHandler(this.props.modelId) }>
                <div className={`card to-hover ${classes.ModelContentSection}`}>
                    { this.props.verified ? <i className="far fa-check-circle fa-2x p-2"></i> : ''}
                    <img className="card-img-top" src={ this.props.url } alt={ `$${this.props.alt}` } />
                    <div className="card-body">
                      <h5 className="card-title mb-3"> { `${this.props.name}` }</h5>
                      <small className="to-show" style={ { 'marginTop': '-1.2rem!important'} }></small>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModelContentSection;
