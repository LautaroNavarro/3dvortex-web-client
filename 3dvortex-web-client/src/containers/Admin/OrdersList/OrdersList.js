import React, {PureComponent} from 'react';
import Layout from '../../../components/Layout/Layout';
import OrdersListComponent from './OrdersListComponent';

class OrdersList extends PureComponent {

  render () {

    return (
      <Layout>
        <OrdersListComponent />
      </Layout>
    );
  }
}

export default OrdersList;
