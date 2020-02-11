import React, { Component } from 'react';
import Aux from './../../hoc/Aux.js';
import Container from '../../hoc/Container';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import classes from './Layout.module.css';
import Alert from '../../components/Alert/Alert';
import { Redirect } from 'react-router-dom'
import GeneralContext from './GeneralContext';

class Layout extends Component {

    defaultAlertStatus = {
          alert: {
                message: '',
                messageType: '',
                display: false,
          }
    }

    state = {
        redirect: false,
        redirectUrl: '/',
        ...this.defaultAlertStatus,
    }

    setRedirect = (redirectUrl) => {
      this.setState({
        redirectUrl,
        redirect: true,
      })
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirectUrl} />
      }
    }

    handleCloseAlert = () => {
        this.setState({
            ...this.defaultAlertStatus,
        });
    }

    handleRaiseAlert = (message, messageType) => {
        this.setState({
            alert: {
              message,
              messageType,
              display: true,
            }
        });
    }

    isPathAvailable = (path) => {
        if (
            (this.isLoggedIn()) &&
            (this.UNAVAILABLE_PATHS_WITH_LOGIN.indexOf(window.location.pathname) === -1 ? false : true)
        ){
            return false;
        }
        if (
            (!(this.isLoggedIn())) &&
            !(this.AVAILABLE_PATHS_WITHOUT_LOGIN.indexOf(window.location.pathname) === -1 ? false : true)
        ){
            return false;
        }
        if (
            (this.isLoggedIn()) &&
            (this.ADMIN_PATH_REGEXP.exec(window.location.pathname) ? true : false) &&
            (this.getUserFromToken().access_level == 0)
        ){
            return false;
        }
        if (
            (!this.isLoggedIn()) &&
            (this.ADMIN_PATH_REGEXP.exec(window.location.pathname) ? true : false)
        ){
            return false;
        }
        return true;
    }

    ADMIN_PATH_REGEXP = new RegExp('\/admin\/.*');

    AVAILABLE_PATHS_WITHOUT_LOGIN = [
        '/login',
        '/signin',
        '/',
    ]

    UNAVAILABLE_PATHS_WITH_LOGIN = [
        '/login',
        '/signin',
    ]

    componentDidMount (prevProps, prevState, snapshot) {
        if ( !this.isPathAvailable(window.location.pathname) ){
            this.setRedirect('/');
        }
    }

    isLoggedIn () {
        return Boolean(sessionStorage.getItem('token'));
    }

    getUserFromToken() {
        if (this.isLoggedIn()) {
            return JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
        } else {
            return {};
        }

    }

    render () {
        return (
            <GeneralContext.Provider value={
                {
                    raiseAlert: this.handleRaiseAlert,
                    setRedirect: this.setRedirect,
                    renderRedirect: this.renderRedirect,
                    user: this.getUserFromToken(),
                }
            }>
            <Aux>
                { this.renderRedirect() }

                <NavBar isLoggedIn={this.isLoggedIn()}/>
                <Alert
                    message={this.state.alert.message}
                    display={this.state.alert.display}
                    messageType={this.state.alert.messageType}
                    handleCloseAlert={() => {this.handleCloseAlert()}}
                />
                {this.props.renderBeforeMain}
                    <Container className={classes.Main}>
                        {this.props.children}
                    </Container>
                <Footer />
            </Aux>
            </GeneralContext.Provider>
        );
    }
}

export default Layout;
