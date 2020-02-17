import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import OutlinePrimaryButton from '../../components/Buttons/OutlinePrimaryButton';
import GeneralContext from '../../components/Layout/GeneralContext';
import SearchModelsComponent from './SearchModelsComponent';


class SearchModels extends PureComponent {

  render () {
    return (
      <Layout>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Modelos</h1>
              </div>
            </div>
            <SearchModelsComponent />
        </div>
      </Layout>
    );
  }
}

export default SearchModels;
