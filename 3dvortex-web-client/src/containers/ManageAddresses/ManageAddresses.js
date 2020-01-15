import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import AddressesList from '../../components/AddressesList/AddressesList';

class ManageAddresses extends PureComponent {

  render () {
    return (
      <Layout>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Mis direcciones</h1>
                <p className="lead">Aquí vas a poder agregar, eliminar y editar tus direcciones.</p>
              </div>
            </div>
            <AddressesList />
        </div>
      </Layout>
    );
  }
}

export default ManageAddresses;