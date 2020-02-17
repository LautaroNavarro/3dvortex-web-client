import React, {PureComponent} from 'react';
import Layout from '../../../components/Layout/Layout';
import UsersListComponent from './UsersListComponent';

class UsersList extends PureComponent {

  render () {

    return (
      <Layout>
        <UsersListComponent />
      </Layout>
    );
  }
}

export default UsersList;
