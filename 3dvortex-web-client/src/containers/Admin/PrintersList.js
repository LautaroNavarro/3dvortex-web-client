import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import PrintersListComponent from './PrintersListComponent';

class PrintersList extends PureComponent {

  render () {

    return (
      <Layout>
        <PrintersListComponent />
      </Layout>
    );
  }
}

export default PrintersList;
