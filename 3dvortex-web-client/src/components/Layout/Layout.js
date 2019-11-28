import React, {PureComponent} from 'react';
import Aux from './../../hoc/Aux.js';
import Container from '../../hoc/Container';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import classes from './Layout.module.css';
import Alert from '../../components/Alert/Alert';
import { Redirect } from 'react-router-dom'

export const GeneralContext = React.createContext();

class Layout extends PureComponent {

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

    render () {
        return (
            <Aux>
                <NavBar />
                <Alert
                    message={this.state.alert.message}
                    display={this.state.alert.display}
                    messageType={this.state.alert.messageType}
                    handleCloseAlert={() => {this.handleCloseAlert()}}
                />
                {/*<div>Toolbar, SideDrawer, Backdrop</div>*/}
                <GeneralContext.Provider value={
                    {
                        raiseAlert: this.handleRaiseAlert,
                        setRedirect: this.setRedirect,
                        renderRedirect: this.renderRedirect,
                    }
                }>
                    <Container className={classes.Main}>
                        {this.props.children}
                    </Container>
                </GeneralContext.Provider>
                <Footer />
            </Aux>
        );
    }
}

export default Layout;
