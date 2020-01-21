import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import OutlinePrimaryButton from '../../components/Buttons/OutlinePrimaryButton';


class ManageModels extends PureComponent {

  render () {
    return (
      <Layout>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Mis modelos</h1>
                <p className="lead">Aquí vas a poder agregar, eliminar y editar tus modelos.</p>
              </div>
            </div>
          <OutlinePrimaryButton url='/create-model' text='Crear modelo'/>
        </div>
      </Layout>
    );
  }
}

export default ManageModels;
