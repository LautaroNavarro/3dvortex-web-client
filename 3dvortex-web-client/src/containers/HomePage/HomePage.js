import React, {PureComponent} from 'react';
import Column from '../../hoc/Column';
import Layout from '../../components/Layout/Layout';

class HomePage extends PureComponent {
  render () {
    return (
      <Layout>
        <Column number="12">
            <p>Home</p>
        </Column>
      </Layout>
    );
  }
}

export default HomePage;
