import React, {PureComponent} from 'react';
import GeneralContext from '../../components/Layout/GeneralContext';
import SimpleMap from '../../components/SimpleMap/SimpleMap';
import getUserAddresses from '../../sdk/getUserAddresses';

class AddressesList extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'addresses': [
      {
        name: 'Mi casa',
        latitude: '59.95',
        longitude: '30.33',
      }
    ]
  }

  mountedAddresses = []

  handleGetUserAddresses = (response) => {
    this.setState({addresses: response.addresses})
  }

  handleGetModelError = (error_message) => {
    console.log(error_message);
  }

  componentDidMount () {
    let { user } = this.context;
    getUserAddresses(
      this.handleGetUserAddresses,
      this.handleGetModelError,
      user.id,
      sessionStorage.getItem('token'),
    );
  }

  render () {
    return (
        <div>
        {this.state.addresses.map((address) =>
          <div className="card mb-3" key={ address.id }>
            <div className="row no-gutters">
              <div className="col-md-4">
                {console.log(address.latitude)}
                <SimpleMap
                  height='100%'
                  width='100%'
                  center={ { lat: parseFloat(address.latitude), lng: parseFloat(address.longitude) } }
                />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h5 className="card-title">{ address.name }</h5>
                  <p className="card-text"><small className="text-muted">Latitud: { address.latitude }</small></p>
                  <p className="card-text"><small className="text-muted">Longitud: { address.longitude }</small></p>
                </div>
              </div>
              <div className="col-md-1">

              <div className='navbar navbar-light light-blue lighten-4'>
              <div className='navbar navbar-light light-blue lighten-4'>
                <button className="navbar-toggler toggler-example border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1"
                  aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation"><span className="dark-blue-text"><i
                      className="fas fa-bars fa-1x"></i></span></button>
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

export default AddressesList;
