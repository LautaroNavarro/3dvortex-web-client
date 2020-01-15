import React, {PureComponent} from 'react';
import Column from '../../hoc/Column';
import Layout from '../../components/Layout/Layout';
import Carousel from '../../components/Carousel/Carousel';
import HorizontalSection from '../../components/HorizontalSection/HorizontalSection';
import ModelContentSection from '../../components/ModelContentSection/ModelContentSection';
import CategorySection from '../../components/CategorySection/CategorySection';
import listModels, {NEWESTS_FILTER, MOST_PRINTED_FILTER} from '../../sdk/listModels';

class HomePage extends PureComponent {

    handleGetNewestModels = (response) => {
      let newestModels = response.models.slice(0, 4)
      this.setState({newestModels});
    }

    handleGetMostPrintedModels = (response) => {
      let mostPrintedModels = response.models.slice(0, 4)
      this.setState({mostPrintedModels});
    }

  componentDidMount() {
    listModels(this.handleGetNewestModels, ()=>{}, [NEWESTS_FILTER]);
    listModels(this.handleGetMostPrintedModels, ()=>{}, [MOST_PRINTED_FILTER]);
  }


    state = {
        newestModels: [],
        mostPrintedModels: [],
    }

    render () {
      return (
        <Layout renderBeforeMain={<Carousel />}>
          <Column number="12">
              <HorizontalSection text='Nuevos Modelos'>
                {
                  this.state.newestModels.map(
                    (model) => <ModelContentSection
                      colNumber='3'
                      url={model.image_media ? model.image_media.url : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'}
                      alt={model.description}
                      verified={true}
                      name={model.name}
                      key={model.id}
                      modelId={model.id}
                    />
                  )
                }
              </HorizontalSection>
              <HorizontalSection text='Los mas impresos'>
                {
                  this.state.mostPrintedModels.map(
                    (model) => <ModelContentSection
                      colNumber='3'
                      url={model.image_media ? model.image_media.url : 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'}
                      alt={model.description}
                      verified={true}
                      name={model.name}
                      key={model.id}
                      modelId={model.id}
                    />
                  )
                }
              </HorizontalSection>
              <CategorySection text='Categorias' />
          </Column>
        </Layout>
      );
    }
}

export default HomePage;
