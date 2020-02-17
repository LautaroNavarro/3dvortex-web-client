import React, {PureComponent} from 'react';
import { listCategories } from '../../../sdk/categories';
import { deleteCategory } from '../../../sdk/deleteCategory';
import classes from '../Admin.module.css';
import SimpleModal from '../../../components/Modal/SimpleModal';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../../components/Layout/GeneralContext';


class CategoriesListComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'categories': [],
    'displayDeleteModal': false,
    'selectedCategory': null,
    'search': '',
  }

  redirectToManageCategory (e) {
    if (e.target.id != 'deleteButton') {
      const {setRedirect} = this.context;
      setRedirect(`/admin/categories/${e.target.parentElement.children[0].innerText}`);
    }
  }

  redirectToCreateCategory (e) {
    const {setRedirect} = this.context;
    setRedirect('/admin/categories/new');
  }



  handleSearchChange = (event) => {
    // TODO add request to handle search
  }

  handleListCategories = (response) => {
    this.setState(response);
  }

  handleDeleteCategorySuccessfully = () => {
    listCategories(
      this.handleListCategories,
      this.handleListCategoriesError,
      sessionStorage.getItem('token'),
    );
  }

  handleDeleteCategoryFail = (error_message) => {
    console.log(error_message);
  }

  handleListCategoriesError = (error_message) => {
    console.log(error_message);
  }

  handleDeleteCategory = () => {
    deleteCategory(
      this.handleDeleteCategorySuccessfully,
      this.handleDeleteCategoryFail,
      this.state.selectedCategory,
      sessionStorage.getItem('token')
    );
    this.setState({'displayDeleteModal': false, 'selectedCategory': null});
  }

  handleCloseModal = () => {
    this.setState({'displayDeleteModal': false, 'selectedCategory': null});
  }

  handleOpenModal = (categoryId) => {
    this.setState({'displayDeleteModal': true, 'selectedCategory': categoryId});
  }

  componentDidMount () {
    listCategories(
      this.handleListCategories,
      this.handleListCategoriesError,
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
            handler={ () => this.handleDeleteCategory() }
          />
        </div>
        </SimpleModal> : ''
      }
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Lista de categorias</h1>
              </div>
            </div>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Categoria padre</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
            {
              this.state.categories.map(
                (category) => {
                  return <tr
                        className={ classes.clickeableRow }
                        key={category.id}
                        onClick={ (e) => this.redirectToManageCategory(e) }
                    >
                    <th scope="row">{category.id}</th>
                    <td>{category.name}</td>
                    <td>{category.father_category_id ? category.father_category_id : 'Ninguna'}</td>
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
                handler={() => this.redirectToCreateCategory()}
                text='Nueva categoria'
                className='mr-4'
                />
            </div>
        </div>
    </div>
    );
  }
}

export default CategoriesListComponent;
