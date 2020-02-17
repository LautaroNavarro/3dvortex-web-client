import React, {PureComponent} from 'react';
import { getPrinterById } from '../../../sdk/getPrinterById';
import { updatePrinter } from '../../../sdk/updatePrinter';
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


class PrinterUpdateComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'originalPrinter': {
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
            'id': '',
            'name': '',
            'description': '',
            'price_per_kilogram': '',
        },
        'max_x': '',
        'max_y': '',
        'max_z': '',
    },
      'newPrinter': {
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
            'id': '',
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
    const {raiseAlert} = this.context;
    raiseAlert('Impresora actualizada exitosamente', 'SUCCESS')
  }

  handleUpdatePrinterFail = (error_message) => {
    console.log(error_message)
  }

  handleUpdateUser = (event) => {
    event.preventDefault();
    let name = (this.state.newPrinter.name == this.state.originalPrinter.name) ? null : this.state.newPrinter.name;
    let status = (this.state.newPrinter.status == this.state.originalPrinter.status) ? null : this.state.newPrinter.status;
    let model = (this.state.newPrinter.model == this.state.originalPrinter.model) ? null : this.state.newPrinter.model;
    let addressId = (this.state.newPrinter.address && (this.state.newPrinter.address.id != this.state.originalPrinter.address.id)) ? this.state.newPrinter.address.id : null;
    let materialId = (this.state.newPrinter.material && ((!this.state.originalPrinter.material) || (this.state.newPrinter.material.id != this.state.originalPrinter.material.id))) ? this.state.newPrinter.material.id : null;
    let maxX = (this.state.newPrinter.max_x == this.state.originalPrinter.max_x) ? null : this.state.newPrinter.max_x;
    let maxY = (this.state.newPrinter.max_y == this.state.originalPrinter.max_y) ? null : this.state.newPrinter.max_y;
    let maxZ = (this.state.newPrinter.max_z == this.state.originalPrinter.max_z) ? null : this.state.newPrinter.max_z;
    updatePrinter(
      this.handleUpdatePrinterSuccess,
      this.handleUpdatePrinterFail,
      this.state.newPrinter.id,
      name,
      addressId,
      status,
      model,
      materialId,
      maxX,
      maxY,
      maxZ,
      sessionStorage.getItem('token'),
    );
  }

  handleGetPrinterSuccess = (response) => {
    this.setState({
      'originalPrinter': response,
      'newPrinter': response,
    });
  }

  handleGetPrinterFail = (error_message) => {
    console.log(error_message);
  }

  fieldChanged = () => {
    return (this.state.newPrinter != this.state.originalPrinter);
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
    getPrinterById(
      this.handleGetPrinterSuccess,
      this.handleGetPrinterFail,
      this.props.printerId,
      sessionStorage.getItem('token'),
    );
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
      let printer = JSON.parse(JSON.stringify(this.state.newPrinter));
      printer.name = name;
      this.setState({'newPrinter': printer});
    }

    onChangeModel = ({
        target: {
          value: model,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.newPrinter));
      printer.model = model;
      this.setState({'newPrinter': printer});
    }


    onChangeAddress = ({
        target: {
          value: address,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.newPrinter));
      printer.address.id = address;
      this.setState({'newPrinter': printer});
    }

    onChangeStatus = ({
        target: {
          value: status,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.newPrinter));
      printer.status = status;
      this.setState({'newPrinter': printer});
    }

    onChangeMaterial = ({
        target: {
          value: material,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.newPrinter));
      if (printer.material) {
        printer.material.id = material;
      } else {
        printer.material = {
          'id': material,
        }
      }
      this.setState({'newPrinter': printer});
    }

    onChangeMaxX = ({
        target: {
          value: maxX,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.newPrinter));
      printer.max_x = maxX;
      this.setState({'newPrinter': printer});
    }

    onChangeMaxY = ({
        target: {
          value: maxY,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.newPrinter));
      printer.max_y = maxY;
      this.setState({'newPrinter': printer});
    }

    onChangeMaxZ = ({
        target: {
          value: maxZ,
        },
      }) => {
      let printer = JSON.parse(JSON.stringify(this.state.newPrinter));
      printer.max_z = maxZ;
      this.setState({'newPrinter': printer});
    }

  render () {
    this.setState({'showUpdateButton': this.fieldChanged()});
    return (
      <div>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">{`${this.state.newPrinter.name}`}</h1>
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
                  value={this.state.newPrinter.name}
                  onChange={this.onChangeName}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="input_status">Dirección</label>
                <select className='custom-select' onChange={ (e) => this.onChangeAddress(e) }>
                {

                  (!this.state.userAddresses.find( (element) => {return element.id === this.state.originalPrinter.address.id})) && this.state.originalPrinter.address.id === this.state.newPrinter.address.id ?
                    <option selected value={this.state.originalPrinter.address.id}>{`${this.state.originalPrinter.address.name} - ${this.state.originalPrinter.address.id}`}</option> :
                    <option value={this.state.originalPrinter.address.id}>{ `${this.state.originalPrinter.address.name} - ${this.state.originalPrinter.address.id}`}</option>}
                {
                  this.state.userAddresses.map((address) => {
                    return (
                      address.id === this.state.newPrinter.address.id ?
                      <option selected value={address.id}>{address.name}</option> :
                      <option value={address.id}>{`${address.name} - ${address.id}`}</option>
                    )
                  })
                }
                  </select>
              </div>

              <div className="form-group">
                <label htmlFor="input_status">Estado</label>
                  <select className='custom-select' onChange={ (e) => this.onChangeStatus(e) }>
                  {this.state.newPrinter.status === 0 ? <option selected value={0}>{ PRINTER_STATUSES[0] }</option> : <option value={0}>{ PRINTER_STATUSES[0] }</option>}
                  {this.state.newPrinter.status === 1 ? <option selected value={1}>{ PRINTER_STATUSES[1] }</option> : <option value={1}>{ PRINTER_STATUSES[1] }</option>}
                  {this.state.newPrinter.status === 2 ? <option selected value={2}>{ PRINTER_STATUSES[2] }</option> : <option value={2}>{ PRINTER_STATUSES[2] }</option>}
                  </select>
              </div>

              <div className="form-group">
                <label htmlFor="input_status">Material</label>
                <select className='custom-select' onChange={ (e) => this.onChangeMaterial(e) }>
                { this.state.newPrinter.material && this.state.newPrinter.material.id === null ? <option selected value={null}>Sin material</option> : <option>Sin material</option>}
                {
                  this.state.materials.map((material) => {
                    return (this.state.newPrinter.material && this.state.newPrinter.material.id === material.id ? <option selected value={material.id}>{ material.name }</option> : <option value={material.id}>{ material.name }</option>)
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
                  value={this.state.newPrinter.model}
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
                  value={this.state.newPrinter.max_x}
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
                  value={this.state.newPrinter.max_y}
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
                  value={this.state.newPrinter.max_z}
                  onChange={this.onChangeMaxZ}
                  />
              </div>

              {
                this.state.showUpdateButton ?
                <button
                  className="btn btn-primary btn-block"
                  onClick={ (event) => this.handleUpdateUser(event) }
                >Actualizar</button> : ''
              }
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default PrinterUpdateComponent;
