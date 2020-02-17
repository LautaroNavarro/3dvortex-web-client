import React, {PureComponent} from 'react';
import { listPrinters } from '../../../sdk/listPrinters';
import { deletePrinter } from '../../../sdk/deletePrinter';
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

const CLASS_NAMES_STATUSES = {
  0: classes.printerAvailable,
  1: classes.printerBusy,
  2: classes.printerWaitingTechnical,
}


class PrintersListComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'printers': [],
    'displayDeleteModal': false,
    'selectedPrinters': null,
    'search': '',
  }

  redirectToManagePrinter (e) {
    const {setRedirect} = this.context;
    setRedirect(`/admin/printers/${e.target.parentElement.children[0].innerText}`);
  }

  redirectToCreatePrinter (e) {
    const {setRedirect} = this.context;
    setRedirect('/admin/printers/new');
  }

  handleSearchChange = (event) => {
    this.setState({'search': event.target.value});
    if (this.state.search != '') {
      listPrinters(
        this.handleListPrinters,
        this.handleListPrintersError,
        sessionStorage.getItem('token'),
        this.state.search,
      );
    } else {
      listPrinters(
        this.handleListPrinters,
        this.handleListPrintersError,
        sessionStorage.getItem('token'),
      );
    }
  }

  handleListPrinters = (response) => {
    this.setState(response);
  }

  handleDeletePrinterSuccessfully = () => {
    listPrinters(
      this.handleListPrinters,
      this.handleListPrintersError,
      sessionStorage.getItem('token'),
    );  }

  handleDeletePrinterFail = (error_message) => {
    console.log(error_message);
  }

  handleListPrintersError = (error_message) => {
    console.log(error_message);
  }

  handleDeletePrinter = () => {
    deletePrinter(
      this.handleDeletePrinterSuccessfully,
      this.handleDeletePrinterFail,
      this.state.selectedPrinter,
      sessionStorage.getItem('token')
    );
    this.setState({'displayDeleteModal': false, 'selectedPrinter': null});
  }

  handleCloseModal = () => {
    this.setState({'displayDeleteModal': false, 'selectedPrinter': null});
  }

  handleOpenModal = (printerId) => {
    this.setState({'displayDeleteModal': true, 'selectedPrinter': printerId});
  }

  componentDidMount () {
    listPrinters(
      this.handleListPrinters,
      this.handleListPrintersError,
      sessionStorage.getItem('token'),
    );
  }

  render () {

    return (
    <div>
      { this.state.displayDeleteModal ?
        <SimpleModal
          handleClickClose={() => this.handleCloseModal()}
        >
        <div className='text-center'>
          <h2>¿Esta seguro de que desea borrar la impresora {this.state.selectedPrinter}?</h2>
          <PrimaryButton
            handler={() => this.handleCloseModal()}
            text='Cancelar'
            className='mr-4'
          />
          <OutlineSecondaryButton
            text='Aceptar'
            handler={ () => this.handleDeletePrinter() }
          />
        </div>
        </SimpleModal> : ''
      }
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Lista de impresoras</h1>
              </div>
            </div>
            <input
              className="form-control mb-4"
              type="text"
              placeholder="Buscar por nombre"
              aria-label="Buscar por nombre"
              onChange={ (event) => this.handleSearchChange(event) }
            />
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Direccion</th>
                  <th scope="col">Estado</th>
                  <th scope="col"></th>
                  <th scope="col">Max x</th>
                  <th scope="col">Max y</th>
                  <th scope="col">Max z</th>
                  <th scope="col">Material</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
            {
              this.state.printers.map(
                (printer) => {
                  return <tr
                        className={ classes.clickeableRow }
                        key={printer.id}
                        onClick={ (e) => this.redirectToManagePrinter(e) }
                    >
                    <th scope="row">{printer.id}</th>
                    <td>{printer.name}</td>
                    <td>{printer.address.name}</td>
                    <td>
                      { PRINTER_STATUSES[printer.status] }
                    </td>
                    <td>
                      <i className={`fas fa-circle ${CLASS_NAMES_STATUSES[printer.status]}`}></i>
                    </td>
                    <td>{printer.max_x}</td>
                    <td>{printer.max_y}</td>
                    <td>{printer.max_z}</td>
                    <td>{ printer.material ? printer.material.name : ''}</td>
                    <span className={ classes.indexBigger }>
                    <td className={ classes.clickeableIcon } onClick={ () => this.handleOpenModal(printer.id) }>
                      <i className="far fa-trash-alt"></i>
                    </td>
                    </span>
                  </tr>
                }
              )
            }
              </tbody>
            </table>
            <div className='text-center'>
              <PrimaryButton
                handler={() => this.redirectToCreatePrinter()}
                text='Nueva impresora'
                className='mr-4'
                />
            </div>
        </div>
    </div>
    );
  }
}

export default PrintersListComponent;
