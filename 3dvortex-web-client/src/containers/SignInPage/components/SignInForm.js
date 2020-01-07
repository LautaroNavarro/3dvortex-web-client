import React, {PureComponent} from 'react';
import Row from '../../../hoc/Row';
import Column from '../../../hoc/Column';
import classes from './SignInForm.module.css';
import GeneralContext from '../../../components/Layout/GeneralContext';
import signIn from '../../../sdk/signIn';

class SignInForm extends PureComponent {

    static contextType = GeneralContext;

    state = {
      email: '',
      password: '',
      name: '',
      lastname: '',
    }

    setToken = (token) => {
      sessionStorage.setItem('token', token);
      const {setRedirect} = this.context;
      setRedirect();
    }

    handleSignInError = (error_message) => {
      const { raiseAlert } = this.context;

      raiseAlert(error_message, 'DANGER');
    }

    valideEmail = (email) => {
      return /\S+@\S+\.\S+/.test(email);
    }

    checkAllRequiredFieldsAreFulled = (state) => {
        let fields = [state.email, state.password, state.name, state.lastname]
        return fields.every((field) => (field));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {raiseAlert} = this.context;
        const {email, password, name, lastname} = this.state;
        if (this.checkAllRequiredFieldsAreFulled(this.state)){
          if (this.valideEmail(email)) {
            signIn(email, password, name, lastname, this.setToken, this.handleSignInError);
          } else {
            raiseAlert('Invalid email', 'DANGER');
          }
        } else {
            raiseAlert('Complete the required fields', 'DANGER');
        }

    }

    onChangeEmail = ({
        target: {
          value: email,
        },
      }) => {
      this.setState({email});
    }

    onChangePassword = ({
        target: {
          value: password,
        },
      }) => {
      this.setState({password});
    }

    onChangeName = ({
        target: {
          value: name,
        },
      }) => {
      this.setState({name});
    }


    onChangeLastName = ({
        target: {
          value: lastname,
        },
      }) => {
      this.setState({lastname});
    }

    render () {
    return (
        <Row>
            {this.context.renderRedirect()}
            <Column number="12">
            <form className={`form-signin ${classes.SignInForm}`} onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="input_email">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  id="input_email"
                  aria-describedby="emailHelp"
                  placeholder="navarro_lautaro@hotmail.com"
                  value={this.state.email}
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
                  value={this.state.name}
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
                  value={this.state.lastname}
                  onChange={this.onChangeLastName}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="input_password">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="input_password"
                  placeholder="***********"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Comenzar</button>
              <div className="text-center">
                  <p>Ya tenes cuenta?
                    <a href="./login">Inicia sesión</a>
                  </p>
              </div>
              <div className="text-center">
                  <p className="text-muted">© 2019</p>
              </div>
            </form>
            </Column>
        </Row>
    )
    }
}

export default SignInForm;
