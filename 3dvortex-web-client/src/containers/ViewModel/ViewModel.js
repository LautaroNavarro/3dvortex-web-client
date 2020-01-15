import React, {PureComponent} from 'react';
import Layout from '../../components/Layout/Layout';
import DinamicModelVisualizer from '../../components/DinamicModelVisualizer/DinamicModelVisualizer';
import Row from '../../hoc/Row';
import Column from '../../hoc/Column';
import getModelById from '../../sdk/getModelById';
import PrintModelForm from './PrintModelForm/PrintModelForm';

class ViewModel extends PureComponent {

    state = {
        'model': {}
    }

    handleGetModel = (response) => {
        this.setState({model: response});
    }

    handleGetModelError = (error) => {
        console.log(error);
    }

    componentDidMount() {
        getModelById(
            this.handleGetModel,
            this.handleGetModelError,
            this.props.match.params.id,
            sessionStorage.getItem('token'),
        );
    }

  render () {
    return (
    <Layout>
    { (this.state.model) ?
        <div>
            <div class="jumbotron jumbotron-fluid">
              <div class="container">
                <h1 class="display-4">{ this.state.model.name }</h1>
                <p class="lead">{ this.state.model.description }</p>
              </div>
            </div>
            <Row>
                <Column number='6'>
                    <DinamicModelVisualizer
                        image={ {
                            'url': 'https://www.characterstation.com/eshop/8108-large_default/figur-funko-pop-custom-blank-male-diy-geneva-switzerland-online-shop.jpg',
                            'alt': 'alt'
                        } }
                        model={{ 'url': 'https://3d-vortex-models.s3.us-east-2.amazonaws.com/object.stl'}}
                    />
                </Column>
                <Column number='6'>
                    <PrintModelForm />
                </Column>
            </Row>
        </div> : ''
    }
    </Layout>
    );
  }
}

export default ViewModel;
