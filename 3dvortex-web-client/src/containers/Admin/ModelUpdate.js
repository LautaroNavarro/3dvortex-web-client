import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import ModelUpdateComponent from './ModelUpdateComponent';

class ModelUpdate extends PureComponent {

  render () {
    return (
      <Layout>
        <ModelUpdateComponent modelId={this.props.match.params.id}/>
      </Layout>
    );
  }
}

export default ModelUpdate;
