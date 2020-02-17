import React, {PureComponent} from 'react';
import Layout from '../../../components/Layout/Layout';
import MaterialsListComponent from './MaterialsListComponent';

class MaterialsList extends PureComponent {

  render () {

    return (
      <Layout>
        <MaterialsListComponent />
      </Layout>
    );
  }
}

export default MaterialsList;
