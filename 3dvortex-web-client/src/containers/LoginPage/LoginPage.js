import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import Alert from '../../components/Alert/Alert';
import LogInForm from './components/LogInForm';
import classes from './LoginPage.module.css';
import VortexLogo from '../../components/Icons/VortexLogo.png';

class HomePage extends PureComponent {

    state = {
      alert: {
        message: '',
        messageType: '',
        display: false,
      }
    }

    handleCloseAlert = () => {
        this.setState({
            alert: {
              message: '',
              messageType: '',
              display: false,
            }
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
      <Layout>
        <Alert
            message={this.state.alert.message}
            display={this.state.alert.display}
            messageType={this.state.alert.messageType}
            handleCloseAlert={() => {this.handleCloseAlert()}}
        />
      <div className={classes.PresentationForm}>
          <div className="text-center">
            <img  src={VortexLogo} className={classes.VortexLogo} alt="fireSpot"/>
          </div>
            <LogInForm
                handleRaiseAlert={(message, messageType) => {this.handleRaiseAlert(message, messageType)}}
            />
        </div>
      </Layout>
    );
  }
}

export default HomePage;
