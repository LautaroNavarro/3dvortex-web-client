import React, {PureComponent} from 'react';
import OutlinePrimaryButton from '../../components/Buttons/OutlinePrimaryButton';
import InteractiveModelVisualizer from '../../components/InteractiveModelVisualizer/InteractiveModelVisualizer';
import StaticModelVisualizer from '../../components/StaticModelVisualizer/StaticModelVisualizer';
import Spinner from '../../components/Spinner/Spinner';
import Row from '../../hoc/Row';
import Column from '../../hoc/Column';
import { listCategories } from '../../sdk/categories';
import { createModelMedia } from '../../sdk/createModelMedia';
import { createImageMedia } from '../../sdk/createImageMedia';
import { createModel } from '../../sdk/createModel';
import GeneralContext from '../../components/Layout/GeneralContext';

class ModelForm extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'modelMedia': {
      'url': '',
      'id': '',
    },
    'imageMedia': {
      'url': '',
      'id': '',
    },
    'name': '',
    'description': '',
    'selectedCategory': null,
    'categories': [],
    'uploadingFile': false,
    'creatingModel': false,
    'privacy': 1,
  }

  handleGetCategories = (categories) => {
    this.setState(categories);
  }

  handleImageMediaUploadedSuccesfully = (response) => {
    this.setState({uploadingFile: false});
    const { raiseAlert } = this.context;
    raiseAlert('Binary file uploaded succesfully', 'SUCCESS');
    this.setState({'imageMedia': {'url': response.url, 'id': response.id}});
  }

  handleImageMediaUploadFailed = (error_message) => {
    this.setState({uploadingFile: false});
    const { raiseAlert } = this.context;
    console.log(error_message);
    raiseAlert('We were not able to upload the file', 'DANGER');
  }

  requiredFieldAreFilled = () => {
    if (!(this.state.name && this.state.imageMedia.id && this.state.modelMedia.id) ) {
      return false;
    }
    return true;
  }

  handleCreateModelSuccesfully = (response) => {
    this.setState({creatingModel: true});
    const { setRedirect } = this.context;
    setRedirect('/manage-models');
  }

  handleCreateModelFailed = (error_message) => {
      this.setState({creatingModel: true});
      const { raiseAlert } = this.context;
      console.log(error_message);
      raiseAlert('We were not able to create the model, please try later', 'DANGER');
  }
  handleSubmit = () => {
    const { raiseAlert, user } = this.context;
    if (this.requiredFieldAreFilled()){
      createModel(
        this.handleCreateModelSuccesfully,
        this.handleCreateModelFailed,
        user.id,
        this.state.name,
        this.state.description,
        this.state.selectedCategory,
        this.state.imageMedia.id,
        this.state.modelMedia.id,
        this.state.privacy,
        sessionStorage.getItem('token'),
      )
      this.setState({creatingModel: true});
    }
    else {
      raiseAlert('Fill the required fields. Name, model & image are required', 'DANGER');
    }
  }

  saveImageHandler = (imageData) => {
    this.setState({uploadingFile: true});
    createImageMedia(
      this.handleImageMediaUploadedSuccesfully,
      this.handleImageMediaUploadFailed,
      imageData,
      sessionStorage.getItem('token'),
    );
  }

  handleGetCategoriesError = (error_message) => {
    console.log(error_message);
  }

  componentDidMount() {
    listCategories(this.handleGetCategories, this.handleGetCategoriesError);
  }

  onChangeCategoryHandler = (e) => {
      this.setState({'selectedCategory': e.target.value});
  }

  onChangePrivacyHandler = (e) => {
      this.setState({'privacy': parseInt(e.target.value)});
  }


  handleChangeName = (e) => {
      this.setState({'name': e.target.value});
  }

  handleChangeDescription = (e) => {
      this.setState({'description': e.target.value});
  }

  handleModelMediaUploadedSuccesfully = (response) => {
    this.setState({uploadingFile: false});
    const { raiseAlert } = this.context;
    raiseAlert('Binary file uploaded succesfully', 'SUCCESS');
    this.setState({'modelMedia': {'url': response.url, 'id': response.id}});
  }

  handleModelMediaUploadFailed = (error_message) => {
      this.setState({uploadingFile: false});
      const { raiseAlert } = this.context;
      console.log(error_message);
      raiseAlert('We were not able to upload the file', 'DANGER');
  }

  uploadModelHandler = (e) => {
    this.setState({uploadingFile: true});
    if (e.target.files[0].name.split('.')[1] === 'stl'){
      createModelMedia(
        this.handleModelMediaUploadedSuccesfully,
        this.handleModelMediaUploadFailed,
        e.target.files[0],
        sessionStorage.getItem('token'),
      );
    } else{
      console.log('show error');
    }
  }

  render () {
    return (
      <div>
      {this.state.uploadingFile ? <Spinner>
          <div>
            <Row>
            <div className="spinner-border m-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            </Row>
            <Row>
              <p className='m-auto'>Uploading file...</p>
            </Row>
          </div>
      </Spinner> : ''}

      {this.state.creatingModel ? <Spinner>
          <div>
            <Row>
            <div className="spinner-border m-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            </Row>
            <Row>
              <p className='m-auto'>Creating model...</p>
            </Row>
          </div>
      </Spinner> : ''}

            <form>
              <Row>
              <Column number='6'>
                <div className='form-group'>
                  <label htmlFor='name'>Nombre</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    aria-describedby='nameHelp'
                    placeholder='Funko Pop'
                    value={this.state.name}
                    onChange={ (e) => this.handleChangeName(e) }
                    />
                </div>
                <div className='form-group'>
                  <label htmlFor='description'>Descripcion</label>
                  <input
                    type='text'
                    className='form-control'
                    id='description'
                    aria-describedby='descriptionHelp'
                    placeholder='Este es un divertido funko'
                    value={this.state.description}
                    onChange={ (e) => this.handleChangeDescription(e) }
                    />
                </div>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <label className='input-group-text' htmlFor='inputGroupSelect01'>Categoria</label>
                  </div>
                  <select className='custom-select' id='inputGroupSelect01' onChange={ (e) => this.onChangeCategoryHandler(e) }>
                  <option value={null} defaultValue >Sin categoria</option>
                  {this.state.categories.map( (category) =>
                    <option value={category.id}>{category.name}</option>
                  )}
                  </select>
                </div>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <label className='input-group-text' htmlFor='inputGroupSelect01'>Privacidad</label>
                  </div>
                  <select className='custom-select' id='inputGroupSelect01' onChange={ (e) => this.onChangePrivacyHandler(e) }>
                  <option value={1} defaultValue>Publico</option>
                  <option value={0}>Privado</option>
                  </select>
                </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">Archivo STL</span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={ (e) => this.uploadModelHandler(e) }
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">Subir modelo</label>
              </div>
            </div>
            <div className="input-group mb-3">
            </div>
            <OutlinePrimaryButton handler={()=> this.handleSubmit()} text='Crear modelo'/>
              </Column>
              <Column number='6'>
              {!this.state.modelMedia.url ? '' :
              <InteractiveModelVisualizer
                maxHeight='250px'
                minHeight='250px'
                maxWidth='250px'
                minWidth='250px'
                url={this.state.modelMedia.url}
                saveImageHandler={(imgData) => this.saveImageHandler(imgData)}
              />
              }
              {!this.state.imageMedia.url ? '' :
              <StaticModelVisualizer
                height='250px'
                width='250px'
                url={this.state.imageMedia.url}
              />
              }
              </Column>
              </Row>
            </form>
      </div>
    );
  }
}

export default ModelForm;
