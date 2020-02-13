import { baseURI } from '../../sdk/config';
import React, {PureComponent} from 'react';
import { getModelById } from '../../sdk/getModelById';
import { updateModel } from '../../sdk/updateModel';
import { createModelMediaFromUrl } from '../../sdk/createModelMediaFromUrl';
import { createImageMediaFromUrl } from '../../sdk/createImageMediaFromUrl';
import { listCategories } from '../../sdk/categories';
import classes from './UsersList.module.css';
import SimpleModal from '../../components/Modal/SimpleModal';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../components/Layout/GeneralContext';


class UserUpdateComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'originalModel': {
      'id': '',
      'name': '',
      'description': '',
      'model_media': {'url': '', 'id': ''},
      'image_media': {'url': '', 'id': ''},
      'privacy': '',
      'category': '',
    },
      'newModel': {
        'id': '',
        'name': '',
        'description': '',
        'model_media': {'url': '', 'id': ''},
        'image_media': {'url': '', 'id': ''},
        'privacy': '',
        'category': '',
    },
    'showUpdateButton': false,
    'categories': [],
    'displaySpinner': false,
  }

  handleGetCategories = (categories) => {
    this.setState(categories);
  }

  handleGetCategoriesError = (error_message) => {
    console.log(error_message);
  }

  handleUpdateModelSuccess = () => {
    const {raiseAlert} = this.context;
    raiseAlert('Modelo actualizado exitosamente', 'SUCCESS')
  }

  handleUpdateModelFail = (error_message) => {
    console.log(error_message)
  }

  modelMediaCreation () {
    let model_media_url = (this.state.newModel.model_media.url == this.state.originalModel.model_media.url) ? null : this.state.newModel.model_media.url;
    if (model_media_url) {
      let request = new XMLHttpRequest();
      request.responseType = 'json';
      request.open('POST', `${baseURI}/models/from-url`, false);
      let body = {'url': String(model_media_url)}
      request.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
      return request.id;
    return null;
    }
  }

  imageMediaCreation () {
    let image_media_url = (this.state.newModel.image_media.url == this.state.originalModel.image_media.url) ? null : this.state.newModel.image_media.url;
    if (image_media_url) {
      let request = new XMLHttpRequest();
      request.responseType = 'json';
      request.open('POST', `${baseURI}/images/from-url`, false);
      let body = {'url': String(image_media_url)}
      request.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
      return request.id;
    return null
    }
  }

  handleUpdateModel = (event) => {
    event.preventDefault();
    this.setState({'displaySpinner': true});
    let model_media_id = this.modelMediaCreation();
    let image_media_id = this.imageMediaCreation();
    let name = (this.state.newModel.name == this.state.originalModel.name) ? null : this.state.newModel.name;
    let description = (this.state.newModel.description == this.state.originalModel.description) ? null : this.state.newModel.description;
    let category = (this.state.newModel.category == this.state.originalModel.category) ? null : this.state.newModel.category;
    let privacy = (this.state.newModel.privacy == this.state.originalModel.privacy) ? null : this.state.newModel.privacy;
    updateModel(
      this.handleUpdateModelSuccess,
      this.handleUpdateModelFail,
      this.state.newModel.id,
      name,
      description,
      model_media_id,
      image_media_id,
      category,
      privacy,
      sessionStorage.getItem('token'),
    );

  }

  handleGetModelSuccess = (response) => {
    this.setState({
      'originalModel': response,
      'newModel': response,
    });
  }

  handleGetModelFail = (error_message) => {
    console.log(error_message);
  }

  fieldChanged = () => {
    return (this.state.newModel != this.state.originalModel);
  }

  componentDidMount () {
    getModelById(
      this.handleGetModelSuccess,
      this.handleGetModelFail,
      this.props.modelId,
      sessionStorage.getItem('token'),
    );
    listCategories(this.handleGetCategories, this.handleGetCategoriesError);
  }

    onChangeName = ({
        target: {
          value: name,
        },
      }) => {
      let model = {...this.state.newModel};
      model.name = name;
      this.setState({'newModel': model});
    }

    onChangeDescription = ({
        target: {
          value: description,
        },
      }) => {
      let model = {...this.state.newModel};
      model.description = description;
      this.setState({'newModel': model});
    }

    onChangeModelMediaUrl = ({
        target: {
          value: model_media_url,
        },
      }) => {
      let model = {...this.state.newModel};
      model.model_media.url = model_media_url;
      this.setState({'newModel': model});
    }

    onChangeImageMediaUrl = ({
        target: {
          value: image_media_url,
        },
      }) => {
      let model = {...this.state.newModel};
      model.image_media.url = image_media_url;
      this.setState({'newModel': model});
    }

    onChangePrivacy = ({
        target: {
          value: privacy,
        },
      }) => {
      let model = {...this.state.newModel};
      model.privacy = privacy;
      this.setState({'newModel': model});
    }

    onChangeCategory = ({
        target: {
          value: category,
        },
      }) => {
      let model = {...this.state.newModel};
      model.category = category;
      this.setState({'newModel': model});
    }

  render () {
    this.setState({'showUpdateButton': this.fieldChanged()});
    return (
      <div>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">{ this.state.newModel.name }</h1>
              </div>
            </div>
            <div>
            <form className={`form-signin ${classes.SignInForm}`} onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="input_name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="input_name"
                  aria-describedby="nameHelp"
                  value={this.state.newModel.name}
                  onChange={this.onChangeName}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="input_description">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="input_description"
                  aria-describedby="descriptionHelp"
                  value={this.state.newModel.description}
                  onChange={this.onChangeDescription}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="input_image_url">URL de imagen</label>
                <input
                  type="text"
                  className="form-control"
                  id="input_image_url"
                  aria-describedby="urlImageHelp"
                  placeholder="Navarro"
                  value={this.state.newModel.image_media ? this.state.newModel.image_media.url : ''}
                  onChange={ this.onChangeImageMediaUrl }
                  />
              </div>
              <div className="form-group">
                <label htmlFor="input_model_url">URL de modelo</label>
                <input
                  type="text"
                  className="form-control"
                  id="input_model_url"
                  aria-describedby="urlModelHelp"
                  placeholder="Navarro"
                  value={this.state.newModel.model_media ? this.state.newModel.model_media.url : ''}
                  onChange={ this.onChangeModelMediaUrl }
                  />
              </div>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <label className='input-group-text' htmlFor='inputGroupSelect01'>Categoria</label>
                  </div>
                  <select className='custom-select' id='inputGroupSelect01' onChange={ (e) => this.onChangeCategory(e) }>
                  <option value={null} defaultValue >Sin categoria</option>
                  {this.state.categories.map( (category) =>
                    {
                      if (this.state.newModel.category == category.id) {
                        return <option value={category.id} selected>{category.name}</option>
                      } else {
                        return <option value={category.id}>{category.name}</option>
                      }
                    }
                  )}
                  </select>
                </div>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <label className='input-group-text' htmlFor='inputGroupSelect01'>Privacidad</label>
                  </div>
                    {
                      this.state.newModel && this.state.newModel.privacy == 1 ?
                        <select className='custom-select' id='inputGroupSelect01' onChange={ (e) => this.onChangePrivacy(e) }>
                          <option value={1} selected>Publico</option>
                          <option value={0} >Privado</option>
                        </select>
                        :
                        <select className='custom-select' id='inputGroupSelect01' onChange={ (e) => this.onChangePrivacy(e) }>
                          <option value={1} >Publico</option>
                          <option value={0} selected>Privado</option>
                        </select>
                    }
                </div>
              {
                this.state.showUpdateButton ?
                <button
                  className="btn btn-primary btn-block"
                  onClick={ (event) => this.handleUpdateModel(event) }
                >Actualizar</button> : ''
              }
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default UserUpdateComponent;
