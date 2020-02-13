import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import ModelsListComponent from './ModelsListComponent';

class ModelsList extends PureComponent {

  render () {

    return (
      <Layout>
        <ModelsListComponent />
      </Layout>
    );
  }
}

export default ModelsList;
