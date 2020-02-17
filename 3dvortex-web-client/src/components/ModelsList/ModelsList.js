import React, {PureComponent} from 'react';
import classes from './ModelsList.module.css'
import GeneralContext from '../../components/Layout/GeneralContext';
import StaticModelVisualizer from '../../components/StaticModelVisualizer/StaticModelVisualizer';
import getUserAddresses from '../../sdk/getUserAddresses';


class ModelsList extends PureComponent {

  static contextType = GeneralContext;

  mountedAddresses = []

  handleClickModel = (modelId) => {
    const { setRedirect } = this.context;
    setRedirect(`/models/${modelId}`);
  }

  render () {
    return (
        <div>
        {this.props.models.map((model) =>
          <div className={`card mb-3 ${classes.clickeableRow}`} key={ model.id } onClick={() => this.handleClickModel(model.id)}>
            <div className="row no-gutters">
              <div className="col-md-4 p-2">
                <StaticModelVisualizer url={model.image_media.url}
                  height='250px'
                  width='250px'
                />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h5 className="card-title">{ model.name }</h5>
                  <p className="card-text"><small className="text-muted">Descripcion: { model.description }</small></p>
                  <p className="card-text"><small className="text-muted">Privacidad: { model.privacy }</small></p>
                </div>
              </div>
              <div className="col-md-1">

              <div className='navbar navbar-light light-blue lighten-4'>
              <div className='navbar navbar-light light-blue lighten-4'>
              </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent1">
                  <ul className="navbar-nav">
                    <li className="nav-item mx-auto">
                      <span className="nav-link" href="#"><i className="fas fa-edit"></i></span>
                    </li>
                    <li className="nav-item mx-auto">
                      <span className="nav-link" href="#"><i className="fas fa-times"></i></span>
                    </li>
                  </ul>
                </div>
              </div>

              </div>
            </div>
          </div>
          )}
        </div>
    );
  }
}

export default ModelsList;
