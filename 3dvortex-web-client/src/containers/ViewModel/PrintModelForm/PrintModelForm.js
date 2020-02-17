import React, {PureComponent} from 'react';
import Row from '../../../hoc/Row';
import Column from '../../../hoc/Column';
import MercadoPagoCheckoutButton from '../../../components/Buttons/MercadoPagoCheckoutButton';
import classes from './PrintModelForm.module.css';
import Modal from '../../../components/Modal/Modal';
import { getMaterials } from '../../../sdk/getMaterials';
import { getUserAddresses } from '../../../sdk/getUserAddresses';
import { getModelPrice } from '../../../sdk/getModelPrice';
import { createOrder } from '../../../sdk/createOrder';
import GeneralContext from '../../../components/Layout/GeneralContext';
import Spinner from '../../../components/Spinner/Spinner';


class PrintModelForm extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'materials': [],
    'addresses': [],
    'selectedAddress': null,
    'selectedMaterial': null,
    'scale': 1,
    'price': 0,
    'calculatingPrice': true,
    'displayCheckout': false,
    'preferenceId': '',
    'displaySpinner': false,
  }

  handleScale = (e) => {
      this.setState({'scale': parseFloat(e.target.value)});
  }

  onChangeAddresHandler = (e) => {
      this.setState({'selectedAddress': parseInt(e.target.value)});
  }

  onChangeMaterialHandler = (e) => {
      this.setState({'selectedMaterial': parseInt(e.target.value)});
  }

  handleGetMaterialsSuccess = (response) => {
    this.setState({
      'materials': response.materials,
      'selectedMaterial': response.materials[0].id,
    });
  }

  handleGetMaterialsFailure = (error_message) => {
    console.log(error_message);
    // TODO: Show notification error
  }

  handleGetUserAddressSuccess = (response) => {
    this.setState({
      'addresses': response.addresses,
      'selectedAddress': response.addresses.length != 0 ? response.addresses[0].id : null,
    });
    if (response.addresses.length == 0) {
      const { raiseAlert, setRedirect } = this.context;
      raiseAlert('Tienes que crear una dirección antes de continuar', 'DANGER');
      setTimeout(() => setRedirect('/manage-addresses'), 5000);
    }
  }

  handleGetUserAddressFailure = (error_message) => {
    console.log(error_message);
    // TODO: Show notification error
  }

  handleGetModelPriceSuccess = (response) => {
    this.setState({
      'price': response.price,
      'calculatingPrice': false,
    });
  }

  handleGetModelPriceFailure = (error_message) => {
    this.setState({'calculatingPrice': false})
    console.log(error_message);
    // TODO: Show notification error
  }

  handleCreateOrderSucess = (response) => {
      this.setState({
        'preferenceId': response.preference_id,
        'displayCheckout': true,
        'displaySpinner': false,
      });
  }

  handleCreateOrderFail = (response) => {
    const {raiseAlert} = this.context;
    raiseAlert('There was an error creating the order, please try later', 'DANGER');
  }

  handlePrintClick () {
    this.setState({'displaySpinner': true});
    createOrder(
      this.handleCreateOrderSucess,
      this.handleCreateOrderFail,
      this.props.model.id,
      this.state.scale,
      this.state.selectedMaterial,
      this.state.selectedAddress,
      sessionStorage.getItem('token'),
    )
  }

  handleClickCloseCheckout () {
    this.setState({'displayCheckout': false});
  }

  componentDidUpdate(prevProps, prevState) {
    if (
        prevState.selectedMaterial != this.state.selectedMaterial ||
        prevState.scale != this.state.scale
      ){
      this.setState({'calculatingPrice': true})
      if (this.state.selectedMaterial && this.state.scale) {
        getModelPrice(
          this.handleGetModelPriceSuccess,
          this.handleGetModelPriceFailure,
          this.props.model.id,
          this.state.selectedMaterial,
          this.state.scale,
          sessionStorage.getItem('token'),
        );
      }
    }
  }

  componentDidMount() {
    let { user } = this.context;
    getMaterials(
      this.handleGetMaterialsSuccess,
      this.handleGetMaterialsFailure,
      sessionStorage.getItem('token'),
    )
    getUserAddresses(
      this.handleGetUserAddressSuccess,
      this.handleGetUserAddressFailure,
      user.id,
      sessionStorage.getItem('token'),
    );
  }


  render () {
    let maxX = 0;
    let maxY = 0;
    let maxZ = 0;
    if (this.state.scale && this.props.model){
      maxX = (this.props.model.max_x * this.state.scale / 10).toFixed(2);
      maxY = (this.props.model.max_y * this.state.scale / 10).toFixed(2);
      maxZ = (this.props.model.max_z * this.state.scale / 10).toFixed(2);
    }
    return (
      <div>

      {this.state.displaySpinner ? <Spinner>
          <div>
            <Row>
            <div className="spinner-border m-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            </Row>
            <Row>
              <p className='m-auto'>Creating order...</p>
            </Row>
          </div>
      </Spinner> : ''}

          {
            this.state.displayCheckout ? <Modal
              handleClickClose={()=>{this.handleClickCloseCheckout()}}
            >
              <Row>
                <Column number='12'>
                  <h1>Orden de impresión</h1>
                </Column>
              </Row>
              <Row>
                <Column number='12'>
                  <span className='ml-3 font-weight-bold'>Nombre del modelo: </span><span>{this.props.model.name}</span>
                </Column>
              </Row>
              <Row>
                <Column number='12'>
                  <span className='ml-3 font-weight-bold'>Escala: </span><span>{this.state.scale}</span>
                </Column>
              </Row>
              <Row>
                <Column number='12'>
                  <span className='ml-3 font-weight-bold'>Material: </span>
                  <span>
                    {this.state.materials.find(material => material.id === this.state.selectedMaterial).name}
                  </span>
                </Column>
              </Row>
              <Row>
                <Column number='12'>
                  <span className='ml-3 font-weight-bold'>Dirección: </span>
                  <span>
                    {this.state.addresses.find(address => address.id === this.state.selectedAddress).name}
                  </span>
                </Column>
              </Row>
              <Row>
                <Column number='12'>
                  <span className='ml-3 font-weight-bold'>Precio final: </span><span>{this.state.price}</span>
                </Column>
              </Row>
              <Row>
                <Column number='12'>
                  <MercadoPagoCheckoutButton dataPreferenceId={ this.state.preferenceId }/>
                </Column>
              </Row>
            </Modal> : ''
          }
          <div>
          <h1> Imprimir {this.props.model.name} </h1>
            <form className='pl-4 pr-4'>
              <div className='form-group'>
                <label htmlFor='input_material'>Material</label>
                <select
                  className='browser-default custom-select'
                  onChange={ (e) => this.onChangeMaterialHandler(e) }
                >

                  {this.state.materials ? this.state.materials.map((material) => <option
                    value={material.id}
                    key={material.id}
                    >
                    {material.name}
                    </option>
                  ) : ''
                }
                </select>
              </div>
             <div className='form-group'>
                <label htmlFor='input_scale'>Escala</label>
                <input
                  type='number'
                  step={0.01}
                  min='0'
                  className='form-control'
                  id='input_scale'
                  aria-describedby='scaleHelping'
                  placeholder='1'
                  value={ this.state.scale }
                  onChange={ (e) => this.handleScale(e) }
                  />
                <span className='blockquote-footer'>
                  {`Altura maxima X: ${maxX} cm. `}
                  {`Altura maxima Y: ${maxY} cm. `}
                  {`Altura maxima Z: ${maxZ} cm.`}
                </span>
              </div>
              <div className='form-group'>
                <label htmlFor='input_material'>Dirección</label>
                <select
                  className='browser-default custom-select'
                  onChange={ (e) => this.onChangeAddresHandler(e) }
                >
                  {this.state.addresses ? this.state.addresses.map((addresss) => <option
                    value={addresss.id}
                    key={addresss.id}
                    >
                    {addresss.name}
                    </option>
                ) : ''
                }
                </select>
              </div>
              <Row>
                <Column number='6'>
                  <div className={classes.Price}>
                    <div>
                      <span>Precio: {this.state.calculatingPrice ? '' : `$${this.state.price}`}</span>
                      { this.state.calculatingPrice ?
                        <div className="spinner-grow" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                        : ''
                      }
                    </div>
                  </div>
                </Column>
              </Row>
              <Row className='pt-3'>
                <Column number='12'>
                  <button
                    className="btn btn-primary btn-block"
                    type="button"
                    disabled={this.state.calculatingPrice ? true : false}
                    onClick={ ()=> this.handlePrintClick() }
                  >
                    { this.state.calculatingPrice ?
                      <div>
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        <span className="sr-only">Calculando precio...</span>
                      </div> :
                      <span> Imprimir </span>
                    }
                  </button>
                </Column>
              </Row>
            </form>
          </div>
      </div>
    );
  }
}

export default PrintModelForm;
