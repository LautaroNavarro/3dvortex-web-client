import React, {PureComponent} from 'react';
import Layout from '../../../components/Layout/Layout';
import CreateMaterialComponent from './CreateMaterialComponent';

class CreateMaterial extends PureComponent {

  render () {
    return (
      <Layout>
        <CreateMaterialComponent/>
      </Layout>
    );
  }
}

export default CreateMaterial;
