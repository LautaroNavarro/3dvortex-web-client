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
    { ( this.state.model.id ) ?
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">{ this.state.model.name }</h1>
                <p className="lead">{ this.state.model.description }</p>
              </div>
            </div>
            <Row>
                <Column number='6'>
                    <DinamicModelVisualizer
                        image={ {
                            'url': this.state.model.image_media.url,
                            'alt': this.state.model.description
                        } }
                        model={{ 'url': this.state.model.model_media.url}}
                    />
                </Column>
                <Column number='6'>
                    <PrintModelForm
                        model={this.state.model}
                    />
                </Column>
            </Row>
        </div> : ''
    }
    </Layout>
    );
  }
}

export default ViewModel;
