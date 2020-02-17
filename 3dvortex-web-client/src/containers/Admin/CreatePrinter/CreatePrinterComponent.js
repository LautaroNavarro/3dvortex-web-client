import React, {PureComponent} from 'react';
import { getPrinterById } from '../../../sdk/getPrinterById';
import { createPrinter } from '../../../sdk/createPrinter';
import { getMaterials } from '../../../sdk/getMaterials';
import { getUserAddresses } from '../../../sdk/getUserAddresses';
import classes from '../Admin.module.css';
import SimpleModal from '../../../components/Modal/SimpleModal';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../../components/Layout/GeneralContext';

const PRINTER_STATUSES = {
  0: 'Habilitada',
  1: 'Ocupada',
  2: 'Esperando técnico',
}


class CreatePrinterComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
      'printer': {
        'id': '',
        'name': '',
        'address': {
            'id': '',
            'name': '',
            'latitude': '',
            'longitude': ''
        },
        'status': '',
        'model': '',
        'material': {
            'id': null,
            'name': '',
            'description': '',
            'price_per_kilogram': '',
        },
        'max_x': '',
        'max_y': '',
        'max_z': '',
    },
    'showUpdateButton': false,
    'userAddresses': [],
    'materials': [],
  }

  handleUpdatePrinterSuccess = () => {
    const {setRedirect} = this.context;
    setRedirect('/admin/printers')
  }

  handleUpdatePrinterFail = (error_message) => {
    console.log(error_message)
  }

  validateForm = () => {
    if (!this.state.printer.name) {
      return { valid: false, errorMessage: 'name is required'};
    }
    if (this.state.printer.address.id == 0) {
      return { valid: false, errorMessage: 'address is required'};
    }
    if (!this.state.printer.status) {
      return { valid: false, errorMessage: 'status is required'};
    }
    if (!this.state.printer.max_x) {
      return { valid: false, errorMessage: 'max x is required'};
    }
    if (!this.state.printer.max_y) {
      return { valid: false, errorMessage: 'max y is required'};
    }
    if (!this.state.printer.max_z) {
      return { valid: false, errorMessage: 'max z is required'};
    }
    return { valid: true, errorMessage: null};
  }

  handleCreatePrinter = (event) => {
    event.preventDefault();
    const { valid, errorMessage } = this.validateForm();
    if (valid) {
      createPrinter(
        this.handleUpdatePrinterSuccess,
        this.handleUpdatePrinterFail,
        this.state.printer.name,
        this.state.printer.address.id,
        this.state.printer.status,
        this.state.printer.model,
        this.state.printer.material.id,
        this.state.printer.max_x,
        this.state.printer.max_y,
        this.state.printer.max_z,
        sessionStorage.getItem('token'),
      );
    } else {
      const { raiseAlert } = this.context;
      raiseAlert(errorMessage, 'DANGER');
    }

  }

  handleGetMaterialsSuccess = (response) => {
    this.setState({'materials': response.materials});
  }

  handleGetMaterialsFail = (error_message) => {
    console.log(error_message);
  }

  handleGetUserAddressesSuccess = (response) => {
    this.setState({'userAddresses': response.addresses});
  }

  handleGetUserAddressesFail = (error_message) => {
    console.log(error_message);
  }

  componentDidMount () {
    getMaterials(
      this.handleGetMaterialsSuccess,
      this.handleGetMaterialsFail,
      sessionStorage.getItem('token'),
    );
    const { user } = this.context;
    getUserAddresses(
      this.handleGetUserAddressesSuccess,
      this.handleGetUserAddressesFail,
      user.id,
      sessionStorage.getItem('token'),
    );
  }

    onChangeName = ({
        target: {
          value: name,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.printer));
      printer.name = name;
      this.setState({'printer': printer});
    }

    onChangeModel = ({
        target: {
          value: model,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.printer));
      printer.model = model;
      this.setState({'printer': printer});
    }


    onChangeAddress = ({
        target: {
          value: address,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.printer));
      printer.address.id = (address == 0) ? null : address;
      this.setState({'printer': printer});
    }

    onChangeStatus = ({
        target: {
          value: status,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.printer));
      printer.status = status;
      this.setState({'printer': printer});
    }

    onChangeMaterial = ({
        target: {
          value: material,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.printer));
      printer.material.id = (material == 0) ? null : material;
      this.setState({'printer': printer});
    }

    onChangeMaxX = ({
        target: {
          value: maxX,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.printer));
      printer.max_x = maxX;
      this.setState({'printer': printer});
    }

    onChangeMaxY = ({
        target: {
          value: maxY,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.printer));
      printer.max_y = maxY;
      this.setState({'printer': printer});
    }

    onChangeMaxZ = ({
        target: {
          value: maxZ,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.printer));
      printer.max_z = maxZ;
      this.setState({'printer': printer});
    }

  render () {
    return (
      <div>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Crear Impresora</h1>
              </div>
            </div>
            <div>

            <form className={`form-signin ${classes.SignInForm}`} onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="input_name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="input_name"
                  aria-describedby="nameHelp"
                  placeholder=""
                  value={this.state.printer.name}
                  onChange={this.onChangeName}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="input_status">Dirección</label>
                <select className='custom-select' onChange={ (e) => this.onChangeAddress(e) }>
                { !this.state.printer.address.id ?
                  <option value={0} selected>Sin dirección</option>:
                  <option value={0}>Sin dirección</option>
                }
                {
                  this.state.userAddresses.map((address) => {
                    return (
                      address.id === this.state.printer.address.id ?
                      <option value={address.id}>{address.name}</option> :
                      <option value={address.id}>{`${address.name} + ${address.id}`}</option>
                    )
                  })
                }
                  </select>
              </div>

              <div className="form-group">
                <label htmlFor="input_status">Estado</label>
                  <select className='custom-select' onChange={ (e) => this.onChangeStatus(e) }>
                  { !this.state.status ?
                    <option value={null} selected>Estado no seleccionado</option>:
                    <option value={null}>Estado no seleccionado</option>
                  }
                  {this.state.printer.status === 0 ? <option selected value={0}>{ PRINTER_STATUSES[0] }</option> : <option value={0}>{ PRINTER_STATUSES[0] }</option>}
                  {this.state.printer.status === 1 ? <option selected value={1}>{ PRINTER_STATUSES[1] }</option> : <option value={1}>{ PRINTER_STATUSES[1] }</option>}
                  {this.state.printer.status === 2 ? <option selected value={2}>{ PRINTER_STATUSES[2] }</option> : <option value={2}>{ PRINTER_STATUSES[2] }</option>}
                  </select>
              </div>

              <div className="form-group">
                <label htmlFor="input_status">Material</label>
                <select className='custom-select' onChange={ (e) => this.onChangeMaterial(e) }>
                { this.state.printer.material && this.state.printer.material.id === null ? <option selected value={0}>Sin material</option> : <option value={0}>Sin material</option>}
                {
                  this.state.materials.map((material) => {
                    return (this.state.printer.material && this.state.printer.material.id === material.id ? <option selected value={material.id}>{ material.name }</option> : <option value={material.id}>{ material.name }</option>)
                  })
                }
                  </select>
              </div>

              <div className="form-group">
                <label htmlFor="input_model">Modelo</label>
                <input
                  type="text"
                  className="form-control"
                  id="input_model"
                  aria-describedby="modelHelp"
                  placeholder=""
                  value={this.state.printer.model}
                  onChange={this.onChangeModel}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="input_max_x">Maximo x</label>
                <input
                  type="number"
                  className="form-control"
                  id="input_max_x"
                  aria-describedby="maxXHelp"
                  placeholder=""
                  value={this.state.printer.max_x}
                  onChange={this.onChangeMaxX}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="input_max_x">Maximo y</label>
                <input
                  type="number"
                  className="form-control"
                  id="input_max_y"
                  aria-describedby="mayXHelp"
                  placeholder=""
                  value={this.state.printer.max_y}
                  onChange={this.onChangeMaxY}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="input_max_x">Maximo z</label>
                <input
                  type="number"
                  className="form-control"
                  id="input_max_z"
                  aria-describedby="mayZHelp"
                  placeholder=""
                  value={this.state.printer.max_z}
                  onChange={this.onChangeMaxZ}
                  />
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={ (event) => this.handleCreatePrinter(event) }
              >
              Crear Impresora
              </button>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default CreatePrinterComponent;
