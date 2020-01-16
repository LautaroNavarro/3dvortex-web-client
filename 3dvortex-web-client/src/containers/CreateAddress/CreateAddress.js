import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import CreateAddressForm from './CreateAddressForm';


class CreateAddress extends PureComponent {

  render () {

    return (
      <Layout>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Crear dirección</h1>
              </div>
            </div>
            <CreateAddressForm />
        </div>
      </Layout>
    );
  }
}

export default CreateAddress;
