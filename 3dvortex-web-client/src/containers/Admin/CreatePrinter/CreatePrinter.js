import React, {PureComponent} from 'react';
import Layout from '../../../components/Layout/Layout';
import CreatePrinterComponent from './CreatePrinterComponent';

class CreatePrinter extends PureComponent {

  render () {
    return (
      <Layout>
        <CreatePrinterComponent/>
      </Layout>
    );
  }
}

export default CreatePrinter;
