import React, {PureComponent} from 'react';
import ModelsList from '../../components/ModelsList/ModelsList';
import { getUserModels } from '../../sdk/getUserModels';
import GeneralContext from '../../components/Layout/GeneralContext';


class QueryManageModels extends PureComponent {

  static contextType = GeneralContext;

  state = {
    models: []
  }

  handleSucessGetUserModels = (response) => {
    this.setState({models: response.models});
  }

  handleFailedGetUserModels = () => {
    console.log('Failed fetching user models');
  }

  componentDidMount() {
    let { user } = this.context;
    getUserModels(
      this.handleSucessGetUserModels,
      this.handleFailedGetUserModels,
      user.id,
      sessionStorage.getItem('token')
    );
  }

  render () {
    return (
      <div>
        <ModelsList models={this.state.models}/>
      </div>
    );
  }
}

export default QueryManageModels;
