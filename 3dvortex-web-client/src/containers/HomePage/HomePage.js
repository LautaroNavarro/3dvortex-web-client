import React, {PureComponent} from 'react';
import Column from '../../hoc/Column';
import Layout from '../../components/Layout/Layout';
import Carousel from '../../components/Carousel/Carousel';
import HorizontalSection from '../../components/HorizontalSection/HorizontalSection';
import ModelContentSection from '../../components/ModelContentSection/ModelContentSection';
import CategorySection from '../../components/CategorySection/CategorySection';

class HomePage extends PureComponent {
  render () {
    return (
      <Layout renderBeforeMain={<Carousel />}>
        <Column number="12">
            <HorizontalSection text='Nuevos Modelos'>
                <ModelContentSection
                    colNumber='3'
                    url='https://netrinoimages.s3.eu-west-2.amazonaws.com/2017/06/04/454560/269139/border_collie_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2825123_o.jpg'
                    alt='Image description'
                    price='120'
                    name='Perro'
                    key='1'
                    modelId='1'
                />
                <ModelContentSection
                    colNumber='3'
                    url='https://netrinoimages.s3.eu-west-2.amazonaws.com/2017/06/04/454560/269139/border_collie_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2825123_o.jpg'
                    alt='Image description'
                    price='120'
                    name='Perro'
                    key='2'
                    modelId='2'
                />
                <ModelContentSection
                    colNumber='3'
                    url='https://netrinoimages.s3.eu-west-2.amazonaws.com/2017/06/04/454560/269139/border_collie_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2825123_o.jpg'
                    alt='Image description'
                    price='120'
                    name='Perro'
                    key='3'
                    modelId='3'
                />
                <ModelContentSection
                    colNumber='3'
                    url='https://netrinoimages.s3.eu-west-2.amazonaws.com/2017/06/04/454560/269139/border_collie_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2825123_o.jpg'
                    alt='Image description'
                    price='120'
                    name='Perro'
                    key='4'
                    modelId='4'
                />
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
