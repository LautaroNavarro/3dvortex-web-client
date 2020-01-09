import React, { Component } from 'react';
import classes from './CategorySectionItem.module.css';
import GeneralContext from '../../../components/Layout/GeneralContext';

class CategorySectionItem extends Component {

    static contextType = GeneralContext;

    clickHandler = (url) => {
        const {setRedirect} = this.context;
        setRedirect(url);
    }
    render () {

        return (
            <div className='col-2 text-center align-items-center p-0' onClick={() => this.clickHandler(this.props.url)}>
                <div className={`card pt-5 pb-5 link-card ${classes.CategorySectionItem}`}>
                    <div className="card-body">
                        <div className="row text-center align-items-center">
                            <div className="col-12">
                                <i className="fa fa-search"></i>
                            </div>
                        </div>
                    <div className="row text-center align-items-center">
                        <div className="col-12">
                            <small>{ this.props.name }</small>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategorySectionItem;



