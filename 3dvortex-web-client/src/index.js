import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import HomePage from './containers/HomePage/HomePage';
import LoginPage from './containers/LoginPage/LoginPage';
import SignInPage from './containers/SignInPage/SignInPage';
import ViewModel from './containers/ViewModel/ViewModel';
import ManageAddresses from './containers/ManageAddresses/ManageAddresses';
import CreateAddress from './containers/CreateAddress/CreateAddress';
import CreateModel from './containers/CreateModel/CreateModel';
import ManageModels from './containers/ManageModels/ManageModels';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signin" component={SignInPage} />
      <Route path="/models/:id" component={ViewModel} />
      <Route path="/manage-addresses" component={ManageAddresses} />
      <Route path="/manage-models" component={ManageModels} />
      <Route path="/create-address" component={CreateAddress} />
      <Route path="/create-model" component={CreateModel} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


