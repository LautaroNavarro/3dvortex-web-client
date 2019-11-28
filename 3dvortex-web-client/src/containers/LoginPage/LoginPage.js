import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import LogInForm from './components/LogInForm';
import classes from './LoginPage.module.css';
import VortexLogo from '../../components/Icons/VortexLogo.png';


class HomePage extends PureComponent {

  render () {
    return (
      <Layout>
      <div className={classes.PresentationForm}>
          <div className="text-center">
            <img  src={VortexLogo} className={classes.VortexLogo} alt="fireSpot"/>
          </div>
            <LogInForm/>
        </div>
      </Layout>
    );
  }
}

export default HomePage;
