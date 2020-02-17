import React, {PureComponent} from 'react';
import Layout from '../../../components/Layout/Layout';
import UserUpdateComponent from './UserUpdateComponent';

class UserUpdate extends PureComponent {

  render () {
    return (
      <Layout>
        <UserUpdateComponent userId={this.props.match.params.id}/>
      </Layout>
    );
  }
}

export default UserUpdate;
