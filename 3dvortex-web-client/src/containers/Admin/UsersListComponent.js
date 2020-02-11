import React, {PureComponent} from 'react';
import { listUsers } from '../../sdk/listUsers';
import { deleteUser } from '../../sdk/deleteUser';
import classes from './UsersList.module.css';
import SimpleModal from '../../components/Modal/SimpleModal';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../components/Layout/GeneralContext';


class UsersList extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'users': [],
    'displayDeleteModal': false,
    'selectedUser': null,
    'search': '',
  }

  redirectToManageUser (e) {
    const {setRedirect} = this.context;
    setRedirect(`/admin/users/${e.target.parentElement.children[0].innerText}`);
  }

  handleSearchChange = (event) => {
    this.setState({'search': event.target.value});
    if (this.state.search != '') {
      listUsers(
        this.handleListUsers,
        this.handleListUsersError,
        sessionStorage.getItem('token'),
        this.state.search,
      );
    } else {
      listUsers(
        this.handleListUsers,
        this.handleListUsersError,
        sessionStorage.getItem('token'),
      );
    }
  }

  handleListUsers = (response) => {
    this.setState(response);
  }

  handleDeleteUserSuccessfully = () => {
    listUsers(
      this.handleListUsers,
      this.handleListUsersError,
      sessionStorage.getItem('token'),
    );
  }

  handleDeleteUserFail = (error_message) => {
    console.log(error_message);
  }

  handleListUsersError = (error_message) => {
    console.log(error_message);
  }

  handleDeleteUser = () => {
    deleteUser(
      this.handleDeleteUserSuccessfully,
      this.handleDeleteUserFail,
      this.state.selectedUser,
      sessionStorage.getItem('token')
    );
    this.setState({'displayDeleteModal': false, 'selectedUser': null});
  }

  handleCloseModal = () => {
    this.setState({'displayDeleteModal': false, 'selectedUser': null});
  }

  handleOpenModal = (userId) => {
    this.setState({'displayDeleteModal': true, 'selectedUser': userId});
  }

  componentDidMount () {
    listUsers(
      this.handleListUsers,
      this.handleListUsersError,
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
          <h2>¿Esta seguro de que desea borrar el usuario {this.state.selectedUser}?</h2>
          <PrimaryButton
            handler={() => this.handleCloseModal()}
            text='Cancelar'
            className='mr-4'
          />
          <OutlineSecondaryButton
            text='Aceptar'
            handler={ () => this.handleDeleteUser() }
          />
        </div>
        </SimpleModal> : ''
      }
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Lista de usuarios</h1>
              </div>
            </div>
            <input
              className="form-control mb-4"
              type="text"
              placeholder="Buscar por email"
              aria-label="Buscar por email"
              onChange={ (event) => this.handleSearchChange(event) }
            />
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Nivel de accesso</th>
                  <th scope="col">Email</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
            {
              this.state.users.map(
                (user) => {
                  return <tr
                        className={ classes.clickeableRow }
                        key={user.id}
                        onClick={ (e) => this.redirectToManageUser(e) }
                    >
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{ user.access_level == 0 ? 'Comun' : 'Admin' }</td>
                    <td>{user.email}</td>
                    <span className={ classes.indexBigger }>
                    <td className={ classes.clickeableIcon } onClick={ () => this.handleOpenModal(user.id) }>
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

export default UsersList;
