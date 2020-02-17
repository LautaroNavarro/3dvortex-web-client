import React, {PureComponent} from 'react';
import Layout from '../../../components/Layout/Layout';
import CreateCategoryComponent from './CreateCategoryComponent';

class CreateCategory extends PureComponent {

  render () {
    return (
      <Layout>
        <CreateCategoryComponent/>
      </Layout>
    );
  }
}

export default CreateCategory;
