import React, {PureComponent} from 'react';
import Layout from '../../../components/Layout/Layout';
import MaterialUpdateComponent from './MaterialUpdateComponent';

class MaterialUpdate extends PureComponent {

  render () {
    return (
      <Layout>
        <MaterialUpdateComponent materialId={this.props.match.params.id}/>
      </Layout>
    );
  }
}

export default MaterialUpdate;
