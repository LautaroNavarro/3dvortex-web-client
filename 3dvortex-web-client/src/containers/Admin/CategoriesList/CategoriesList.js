import React, {PureComponent} from 'react';
import Layout from '../../../components/Layout/Layout';
import CategoriesListComponent from './CategoriesListComponent';

class CategoriesList extends PureComponent {

  render () {

    return (
      <Layout>
        <CategoriesListComponent />
      </Layout>
    );
  }
}

export default CategoriesList;
