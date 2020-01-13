import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import ModelViewer from './ModelViewer/ModelViewer';

class ViewModel extends PureComponent {

  render () {
    return (
      <Layout>
        <ModelViewer />
      </Layout>
    );
  }
}

export default ViewModel;
