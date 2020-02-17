import React, {PureComponent} from 'react';
import Layout from '../../../components/Layout/Layout';
import PrinterUpdateComponent from './PrinterUpdateComponent';

class PriterUpdate extends PureComponent {

  render () {
    return (
      <Layout>
        <PrinterUpdateComponent printerId={this.props.match.params.id}/>
      </Layout>
    );
  }
}

export default PriterUpdate;
