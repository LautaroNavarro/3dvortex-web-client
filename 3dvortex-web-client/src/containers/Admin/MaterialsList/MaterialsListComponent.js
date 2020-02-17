import React, {PureComponent} from 'react';
import { getMaterials } from '../../../sdk/getMaterials';
import { deleteMaterial } from '../../../sdk/deleteMaterial';
import classes from '../Admin.module.css';
import SimpleModal from '../../../components/Modal/SimpleModal';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../../components/Layout/GeneralContext';


class MaterialsListComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'materials': [],
    'displayDeleteModal': false,
    'selectedMaterial': null,
    'search': '',
  }

  redirectToManageMaterial (e) {
    if (e.target.id != 'deleteButton') {
      const {setRedirect} = this.context;
      setRedirect(`/admin/materials/${e.target.parentElement.children[0].innerText}`);
    }
  }

  redirectToCreateMaterial (e) {
    const {setRedirect} = this.context;
    setRedirect('/admin/materials/new');
  }

  handleSearchChange = (event) => {
    // TODO add request to handle search
  }

  handleListMaterials = (response) => {
    this.setState(response);
  }

  handleDeleteMaterialSuccessfully = () => {
    getMaterials(
      this.handleListMaterials,
      this.handleListMaterialsError,
      sessionStorage.getItem('token'),
    );
  }

  handleDeleteMaterialFail = (error_message) => {
    console.log(error_message);
  }

  handleListMaterialsError = (error_message) => {
    console.log(error_message);
  }

  handleDeleteMaterial = () => {
    deleteMaterial(
      this.handleDeleteMaterialSuccessfully,
      this.handleDeleteMaterialFail,
      this.state.selectedMaterial,
      sessionStorage.getItem('token')
    );
    this.setState({'displayDeleteModal': false, 'selectedMaterial': null});
  }

  handleCloseModal = () => {
    this.setState({'displayDeleteModal': false, 'selectedMaterial': null});
  }

  handleOpenModal = (categoryId) => {
    this.setState({'displayDeleteModal': true, 'selectedMaterial': categoryId});
  }

  componentDidMount () {
    getMaterials(
      this.handleListMaterials,
      this.handleListMaterialsError,
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
          <h2>¿Esta seguro de que desea borrar la categoria {this.state.selectedUser}?</h2>
          <PrimaryButton
            handler={() => this.handleCloseModal()}
            text='Cancelar'
            className='mr-4'
          />
          <OutlineSecondaryButton
            text='Aceptar'
            handler={ () => this.handleDeleteMaterial() }
          />
        </div>
        </SimpleModal> : ''
      }
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Lista de materiales</h1>
              </div>
            </div>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Precio por kilogramo</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
            {
              this.state.materials.map(
                (category) => {
                  return <tr
                        className={ classes.clickeableRow }
                        key={category.id}
                        onClick={ (e) => this.redirectToManageMaterial(e) }
                    >
                    <th scope="row">{category.id}</th>
                    <td>{category.name}</td>
                    <td>{category.price_per_kilogram}</td>
                    <td className={ classes.clickeableIcon } id='deleteButton' onClick={ () => this.handleOpenModal(category.id) }>
                      <i className="far fa-trash-alt"></i>
                    </td>
                  </tr>
                }
              )
            }
              </tbody>
            </table>
            <div className='text-center'>
              <PrimaryButton
                handler={() => this.redirectToCreateMaterial()}
                text='Nuevo material'
                className='mr-4'
                />
            </div>
        </div>
    </div>
    );
  }
}

export default MaterialsListComponent;
