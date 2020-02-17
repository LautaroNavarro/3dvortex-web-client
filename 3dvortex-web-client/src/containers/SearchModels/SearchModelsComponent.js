import React, {PureComponent} from 'react';
import ModelsList from '../../components/ModelsList/ModelsList';
import { listModels } from '../../sdk/listModels';
import GeneralContext from '../../components/Layout/GeneralContext';


class SearchModelsComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    models: [],
    search: [],
  }

  handleSucessListModels = (response) => {
    this.setState({models: response.models});
  }

  handleFailedListModels = () => {
    console.log('Failed fetching models');
  }

  componentDidUpdate = () => {
    let newFilters = this.getFilters();
    let shouldForceUpdate = false;
    newFilters.forEach(
      (element) => {
        if (!this.state.search.includes(element)){
          shouldForceUpdate = true;
        }
      }
    )
    if (shouldForceUpdate) {
      this.setState({search: newFilters});
      listModels(
        this.handleSucessListModels,
        this.handleFailedListModels,
        newFilters,
        sessionStorage.getItem('token')
      );
    }
  }

  getFilters = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const { user } = this.context;
    let filters = [];
    if (params.get('name')){
      filters.push(`name=${params.get('name')}`);
    }
    if (params.get('category_id')){
      filters.push(`category_id=${params.get('category_id')}`);
    }
    return filters;
  }

  componentDidMount() {
    let filters = this.getFilters();
    this.setState({search: filters});
    listModels(
      this.handleSucessListModels,
      this.handleFailedListModels,
      filters,
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

export default SearchModelsComponent;
