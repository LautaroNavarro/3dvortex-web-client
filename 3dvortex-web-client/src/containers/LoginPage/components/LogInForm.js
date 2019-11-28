import React, {PureComponent} from 'react';
import Row from '../../../hoc/Row';
import Column from '../../../hoc/Column';
import classes from './LogInForm.module.css';
import { Redirect } from 'react-router-dom'

class LogInForm extends PureComponent {

    state = {
      redirect: false
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }
    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/' />
      }
    }

    getBase64EmailAndPassword = (email, password) => {
      return `${btoa(email)}:${btoa(password)}`;
    }

    setToken = (token) => {
      sessionStorage.setItem('token', token);
      this.setRedirect();
    }

    handleLoginError = (error_message) => {
      this.props.handleRaiseAlert(error_message, 'DANGER');
    }

    valideEmail = (email) => {
      return /\S+@\S+\.\S+/.test(email);
    }

    handleSubmit = (event) => {
        const email = event.target.parentElement.children[0].children[1].value;
        const password = event.target.parentElement.children[1].children[1].value;
        if (this.valideEmail(email)) {
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'json';
          xhr.addEventListener('load', () => {
            if (xhr.status === 200){
              this.setToken(xhr.response.token);
            } else {
              this.handleLoginError(xhr.response.error_message);
            }
          })
          xhr.open('POST', 'http://localhost:8000/users/authenticate/');
          xhr.setRequestHeader('Authorization', `basic ${this.getBase64EmailAndPassword(email, password)}`);
          xhr.send();
        } else {
          this.props.handleRaiseAlert('Invalid email', 'DANGER');
        }

    }

    render () {
    return (
        <Row>
            {this.renderRedirect()}
            <Column number="12">
            <form className={`form-signin ${classes.LogInForm}`} method="GET" action="./index.html">
              <div className="form-group">
                <label htmlFor="input_email">Correo</label>
                <input type="email" className="form-control" id="input_email" aria-describedby="emailHelp" placeholder="navarro_lautaro@hotmail.com" />
              </div>
              <div className="form-group">
                <label htmlFor="input_password">Contraseña</label>
                <input type="password" className="form-control" id="input_password" placeholder="***********" />
              </div>
              <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Comenzar</button>
              <div className="text-center">
                  <p>No tenes cuenta?
                    <a href="./signin.html">Registrate</a>
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
