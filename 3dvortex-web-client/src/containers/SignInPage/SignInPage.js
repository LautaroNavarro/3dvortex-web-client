import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import SignInForm from './components/SignInForm';
import classes from './SignInPage.module.css';
import VortexLogo from '../../components/Icons/VortexLogo.png';


class SignInPage extends PureComponent {

  render () {
    return (
      <Layout>
      <div className={classes.PresentationForm}>
          <div className="text-center">
            <img  src={VortexLogo} className={classes.VortexLogo} alt="fireSpot"/>
          </div>
            <SignInForm/>
        </div>
      </Layout>
    );
  }
}

export default SignInPage;
