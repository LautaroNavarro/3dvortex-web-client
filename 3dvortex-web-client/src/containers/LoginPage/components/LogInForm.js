import React, {PureComponent} from 'react';
import Row from '../../../hoc/Row';
import Column from '../../../hoc/Column';
import classes from './LogInForm.module.css';
import GeneralContext from '../../../components/Layout/GeneralContext';
import logIn from '../../../sdk/logIn';

class LogInForm extends PureComponent {

    static contextType = GeneralContext;

    state = {
      email: '',
      password: '',
    }

    getBase64EmailAndPassword = (email, password) => {
      return `${btoa(email)}:${btoa(password)}`;
    }

    setToken = (token) => {
      sessionStorage.setItem('token', token);
      const {setRedirect} = this.context;
      setRedirect('/');
    }

    handleLoginError = (error_message) => {
      const { raiseAlert } = this.context;

      raiseAlert(error_message, 'DANGER');
    }

    valideEmail = (email) => {
      return /\S+@\S+\.\S+/.test(email);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {email, password} = this.state;
        if (this.valideEmail(email)) {
          logIn(email, password, this.setToken, this.handleLoginError);
        } else {
          const {raiseAlert} = this.context;

          raiseAlert('Invalid email', 'DANGER');
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

    render () {
    return (
        <Row>
            {this.context.renderRedirect()}
            <Column number="12">
            <form className={`form-signin ${classes.LogInForm}`} onSubmit={this.handleSubmit}>
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
                  <p>No tenes cuenta?
                    <a href="./signin">Registrate</a>
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

export default LogInForm;
