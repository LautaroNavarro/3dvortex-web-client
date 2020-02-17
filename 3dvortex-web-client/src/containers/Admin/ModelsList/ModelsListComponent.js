import React, {PureComponent} from 'react';
import { listModels, NAME_FILTER } from '../../../sdk/listModels';
import { deleteModel } from '../../../sdk/deleteModel';
import classes from '../Admin.module.css';
import SimpleModal from '../../../components/Modal/SimpleModal';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../../components/Layout/GeneralContext';


class ModelsListComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'models': [],
    'displayDeleteModal': false,
    'selectedModel': null,
    'search': '',
  }

  redirectToManageUser (e) {
    const {setRedirect} = this.context;
    setRedirect(`/admin/models/${e.target.parentElement.children[0].innerText}`);
  }

  handleSearchChange = (event) => {
    this.setState({'search': event.target.value});
    if (this.state.search != '') {
      listModels(
        this.handleListModels,
        this.handleListModelsError,
        [`${NAME_FILTER}=${this.state.search}`],
        sessionStorage.getItem('token'),
      );
    } else {
      listModels(
        this.handleListModels,
        this.handleListModelsError,
        [],
        sessionStorage.getItem('token'),
      );
    }
  }

  handleListModels = (response) => {
    this.setState(response);
  }

  handleDeleteModelSuccessfully = () => {
    listModels(
      this.handleListModels,
      this.handleListModelsError,
      [],
      sessionStorage.getItem('token'),
    );
  }

  handleDeleteModelFail = (error_message) => {
    console.log(error_message);
  }

  handleListModelsError = (error_message) => {
    console.log(error_message);
  }

  handleDeleteModel = () => {
    deleteModel(
      this.handleDeleteModelSuccessfully,
      this.handleDeleteModelFail,
      this.state.selectedModel,
      sessionStorage.getItem('token')
    );
    this.setState({'displayDeleteModal': false, 'selectedModel': null});
  }

  handleCloseModal = () => {
    this.setState({'displayDeleteModal': false, 'selectedModel': null});
  }

  handleOpenModal = (modelId) => {
    this.setState({'displayDeleteModal': true, 'selectedModel': modelId});
  }

  componentDidMount () {
    listModels(
      this.handleListModels,
      this.handleListModelsError,
      [],
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
          <h2>¿Esta seguro de que desea borrar el model {this.state.selectedModel}?</h2>
          <PrimaryButton
            handler={() => this.handleCloseModal()}
            text='Cancelar'
            className='mr-4'
          />
          <OutlineSecondaryButton
            text='Aceptar'
            handler={ () => this.handleDeleteModel() }
          />
        </div>
        </SimpleModal> : ''
      }
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Lista de modelos</h1>
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
                  <th scope="col"># Dueño</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Volumen</th>
                  <th scope="col">x</th>
                  <th scope="col">y</th>
                  <th scope="col">z</th>
                  <th scope="col">Privacidad</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
            {
              this.state.models.map(
                (model) => {
                  return <tr
                        className={ classes.clickeableRow }
                        key={model.id}
                        onClick={ (e) => this.redirectToManageUser(e) }
                    >
                    <th scope="row">{model.id}</th>
                    <th >{model.user}</th>
                    <td>{model.name}</td>
                    <td>{model.volume}</td>
                    <td>{model.max_x}</td>
                    <td>{model.max_y}</td>
                    <td>{model.max_z}</td>
                    <td>{model.privacy}</td>
                    <span className={ classes.indexBigger }>
                    <td className={ classes.clickeableIcon } onClick={ () => this.handleOpenModal(model.id) }>
                      <i className="far fa-trash-alt"></i>
                    </td>
                    </span>
                  </tr>
                }
              )
            }
              </tbody>
            </table>
        </div>
    </div>
    );
  }
}

export default ModelsListComponent;
