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
import UsersList from './containers/Admin/UsersList/UsersList';
import ModelsList from './containers/Admin/ModelsList/ModelsList';
import PrintersList from './containers/Admin/PrintersList/PrintersList';
import CategoriesList from './containers/Admin/CategoriesList/CategoriesList';
import MaterialsList from './containers/Admin/MaterialsList/MaterialsList';
import OrdersList from './containers/Admin/OrdersList/OrdersList';
import UserUpdate from './containers/Admin/UserUpdate/UserUpdate';
import PrinterUpdate from './containers/Admin/PrinterUpdate/PrinterUpdate';
import CreatePrinter from './containers/Admin/CreatePrinter/CreatePrinter';
import CreateCategory from './containers/Admin/CreateCategory/CreateCategory';
import CreateMaterial from './containers/Admin/CreateMaterial/CreateMaterial';
import ModelUpdate from './containers/Admin/ModelUpdate/ModelUpdate';
import CategoryUpdate from './containers/Admin/CategoryUpdate/CategoryUpdate';
import MaterialUpdate from './containers/Admin/MaterialUpdate/MaterialUpdate';
import ManageModels from './containers/ManageModels/ManageModels';
import ManageOrders from './containers/ManageOrders/ManageOrders';
import SearchModels from './containers/SearchModels/SearchModels';
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
      <Route path="/manage-orders" component={ManageOrders} />
      <Route path="/create-address" component={CreateAddress} />
      <Route exact path="/admin/users" component={UsersList} />
      <Route exact path="/admin/models" component={ModelsList} />
      <Route exact path="/admin/printers" component={PrintersList} />
      <Route exact path="/admin/categories" component={CategoriesList} />
      <Route exact path="/admin/materials" component={MaterialsList} />
      <Route exact path="/admin/orders" component={OrdersList} />
      <Route exact path="/admin/categories/new" component={CreateCategory} />
      <Route exact path="/admin/materials/new" component={CreateMaterial} />
      <Route exact path="/admin/printers/new" component={CreatePrinter} />
      <Route path="/admin/users/:id" component={UserUpdate} />
      <Route path="/admin/models/:id" component={ModelUpdate} />
      <Route exact path="/admin/materials/:id(\d+)" component={MaterialUpdate} />
      <Route exact path="/admin/categories/:id(\d+)" component={CategoryUpdate} />
      <Route exact path="/admin/printers/:id(\d+)" component={PrinterUpdate} />
      <Route path="/create-model" component={CreateModel} />
      <Route path="/search-models" component={SearchModels} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


