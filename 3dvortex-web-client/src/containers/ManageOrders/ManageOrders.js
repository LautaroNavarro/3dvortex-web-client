import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import OutlinePrimaryButton from '../../components/Buttons/OutlinePrimaryButton';
import GeneralContext from '../../components/Layout/GeneralContext';
import ManageOrdersComponent from './ManageOrdersComponent';


class ManageOrders extends PureComponent {

  render () {
    return (
      <Layout>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Mis ordenes</h1>
                <p className="lead">Aquí vas a poder ver tus ordenes.</p>
              </div>
            </div>
            <ManageOrdersComponent />
        </div>
      </Layout>
    );
  }
}

export default ManageOrders;
