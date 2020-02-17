import React, {PureComponent} from 'react';
import { getUserById } from '../../../sdk/getUserById';
import { updateUser } from '../../../sdk/updateUser';
import classes from '../Admin.module.css';
import SimpleModal from '../../../components/Modal/SimpleModal';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../../components/Layout/GeneralContext';


class UserUpdateComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'originalUser': {
      'id': '',
      'name': '',
      'lastname': '',
      'email': '',
      'access_level': '',
    },
      'newUser': {
        'id': '',
        'name': '',
        'lastname': '',
        'email': '',
        'access_level': '',
    },
    'showUpdateButton': false,
  }

  handleUpdateUserSuccess = () => {
    const {raiseAlert} = this.context;
    raiseAlert('Usuario actualizado exitosamente', 'SUCCESS')
  }

  handleUpdateUserFail = (error_message) => {
    console.log(error_message)
  }

  handleUpdateUser = (event) => {
    event.preventDefault();
    let name = (this.state.newUser.name == this.state.originalUser.name) ? null : this.state.newUser.name;
    let lastname = (this.state.newUser.lastname == this.state.originalUser.lastname) ? null : this.state.newUser.lastname;
    let email = (this.state.newUser.email == this.state.originalUser.email) ? null : this.state.newUser.email;
    updateUser(
      this.handleUpdateUserSuccess,
      this.handleUpdateUserFail,
      this.state.newUser.id,
      name,
      lastname,
      email,
      sessionStorage.getItem('token'),
    );
  }

  handleGetUserSuccess = (response) => {
    this.setState({
      'originalUser': response,
      'newUser': response,
    });
  }

  handleGetUserFail = (error_message) => {
    console.log(error_message);
  }

  fieldChanged = () => {
    return (this.state.newUser != this.state.originalUser);
  }

  componentDidMount () {
    getUserById(
      this.handleGetUserSuccess,
      this.handleGetUserFail,
      this.props.userId,
      sessionStorage.getItem('token'),
    );
  }

    onChangeEmail = ({
        target: {
          value: email,
        },
      }) => {
      let user = JSON.parse(JSON.stringify(this.state.newUser));
      user.email = email;
      this.setState({'newUser': user});
    }

    onChangeAccessLevel = ({
        target: {
          value: access_level,
        },
      }) => {
      let user = JSON.parse(JSON.stringify(this.state.newUser));
      user.access_level = access_level;
      this.setState({'newUser': user});
    }

    onChangeName = ({
        target: {
          value: name,
        },
      }) => {
      let user = JSON.parse(JSON.stringify(this.state.newUser));
      user.name = name;
      this.setState({'newUser': user});
    }


    onChangeLastName = ({
        target: {
          value: lastname,
        },
      }) => {
      let user = JSON.parse(JSON.stringify(this.state.newUser));
      user.lastname = lastname;
      this.setState({'newUser': user});
    }

  render () {
    this.setState({'showUpdateButton': this.fieldChanged()});
    return (
      <div>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">{`${this.state.newUser.name} ${this.state.newUser.lastname}`}</h1>
              </div>
            </div>
            <div>

            <form className={`form-signin ${classes.SignInForm}`} onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="input_email">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  id="input_email"
                  aria-describedby="emailHelp"
                  placeholder="navarro_lautaro@hotmail.com"
                  value={this.state.newUser.email}
                  onChange={this.onChangeEmail}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="input_name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="input_name"
                  aria-describedby="nameHelp"
                  placeholder="Lautaro"
                  value={this.state.newUser.name}
                  onChange={this.onChangeName}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="input_lastname">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="input_lastname"
                  aria-describedby="lastnameHelp"
                  placeholder="Navarro"
                  value={this.state.newUser.lastname}
                  onChange={this.onChangeLastName}
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

export default UserUpdateComponent;
