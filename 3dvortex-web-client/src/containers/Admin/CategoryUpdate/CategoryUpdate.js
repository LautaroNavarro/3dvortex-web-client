import React, {PureComponent} from 'react';
import Layout from '../../../components/Layout/Layout';
import CategoryUpdateComponent from './CategoryUpdateComponent';

class CategoryUpdate extends PureComponent {

  render () {
    return (
      <Layout>
        <CategoryUpdateComponent categoryId={this.props.match.params.id}/>
      </Layout>
    );
  }
}

export default CategoryUpdate;
