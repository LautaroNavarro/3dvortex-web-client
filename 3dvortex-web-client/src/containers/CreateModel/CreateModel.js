import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import ModelForm from './ModelForm';

class CreateModel extends PureComponent {

  render () {
    return (
      <Layout>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Crear modelo</h1>
            </div>
          </div>
          <ModelForm />
      </Layout>
    );
  }
}

export default CreateModel;
