import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import SimpleMap from '../../components/SimpleMap/SimpleMap';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import GeneralContext from '../../components/Layout/GeneralContext';
import createUserAddress from '../../sdk/createUserAddress';

Geocode.setApiKey("AIzaSyCVf0H03RaXz24AJ_HTlnW_iC3rJoBfVfU");

Geocode.setLanguage("es");

Geocode.setRegion("ar");

Geocode.enableDebug();


class CreateAddressForm extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'name': '',
    'search': '',
    'latitude': '-32.8788975',
    'longitude': '-68.85360159999999'
  }

  handleSearch = (e) => {
    this.setState({'search': e.target.value});
    Geocode.fromAddress(this.state.search).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({'latitude': lat,'longitude': lng})
        console.log(lat, lng);
      },
      error => {
        console.error(error);
    }
  )
  }

  handleChangeName = (e) => {
      this.setState({'name': e.target.value});
  }

  handleAddressCreated = (response) => {}
  handleAddressNotCreated = (error_message) => {
    const { raiseAlert } = this.context;
    raiseAlert(error_message, 'DANGER');
  }

  handleSubmit = () => {
    const { raiseAlert, user } = this.context;
    if (!this.state.name){
      raiseAlert('Please fill the required field name', 'DANGER');
    } else if (!this.state.latitude){
      raiseAlert('Please select an address', 'DANGER');
    } else {
      createUserAddress(
        this.handleAddressCreated,
        this.handleAddressNotCreated,
        user.id,
        this.state.name,
        this.state.latitude,
        this.state.longitude,
        sessionStorage.getItem('token'),
      )
      const { setRedirect } = this.context;
      setRedirect('/manage-addresses');
    }
  }

  render () {

    return (
      <div>
        <form className={`form-signin`}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="addressHelp"
                  placeholder="Casa de mis papas"
                  value={this.state.name}
                  onChange={ (e) => this.handleChangeName(e) }
                  />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  aria-describedby="addressHelp"
                  placeholder="Aristobulo del valle 408, Godoy Cruz"
                  value={this.state.search}
                  onChange={ (e) => this.handleSearch(e) }
                  />
              </div>
            <SimpleMap
              center={ {lat: parseFloat(this.state.latitude), lng: parseFloat(this.state.longitude) } }
              width='100%'
              height='400px'
              zoom={19}
            />
            <PrimaryButton
              handler={() => this.handleSubmit() }
              text='Crear dirección'
              className='mt-3'
            />
        </form>

      </div>
    );
  }
}

export default CreateAddressForm;



