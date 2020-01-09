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

  componentDidMount() {
    listModels(this.handleGetNewestModels, ()=>{}, [NEWESTS_FILTER]);
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
                  <ModelContentSection
                      colNumber='3'
                      url='https://netrinoimages.s3.eu-west-2.amazonaws.com/2017/06/04/454560/269139/border_collie_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2825123_o.jpg'
                      alt='Image description'
                      price='120'
                      name='Perro'
                      key='5'
                      modelId='5'
                  />
                  <ModelContentSection
                      colNumber='3'
                      url='https://netrinoimages.s3.eu-west-2.amazonaws.com/2017/06/04/454560/269139/border_collie_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2825123_o.jpg'
                      alt='Image description'
                      price='120'
                      name='Perro'
                      key='6'
                      modelId='6'
                  />
                  <ModelContentSection
                      colNumber='3'
                      url='https://netrinoimages.s3.eu-west-2.amazonaws.com/2017/06/04/454560/269139/border_collie_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2825123_o.jpg'
                      alt='Image description'
                      price='120'
                      name='Perro'
                      key='7'
                      modelId='7'
                  />
                  <ModelContentSection
                      colNumber='3'
                      url='https://netrinoimages.s3.eu-west-2.amazonaws.com/2017/06/04/454560/269139/border_collie_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2825123_o.jpg'
                      alt='Image description'
                      price='120'
                      name='Perro'
                      key='8'
                      modelId='8'
                  />
              </HorizontalSection>
              <CategorySection text='Categorias'>
              </CategorySection>
          </Column>
        </Layout>
      );
    }
}

export default HomePage;
