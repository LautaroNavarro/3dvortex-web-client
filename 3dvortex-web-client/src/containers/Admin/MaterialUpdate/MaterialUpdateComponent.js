import React, {PureComponent} from 'react';
import { getMaterialById } from '../../../sdk/getMaterialById';
import { updateMaterial } from '../../../sdk/updateMaterial';
import { listCategories } from '../../../sdk/categories';
import classes from '../Admin.module.css';
import SimpleModal from '../../../components/Modal/SimpleModal';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../../components/Layout/GeneralContext';


class MaterialUpdateComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'originalMaterial': {
      'id': '',
      'name': '',
      'description': 0,
      'price_per_kilogram': 0,
    },
    'newMaterial': {
      'id': '',
      'name': '',
      'description': 0,
      'price_per_kilogram': 0,
    },
    'showUpdateButton': false,
  }

  handleUpdateMaterialSuccess = () => {
    const {raiseAlert} = this.context;
    raiseAlert('Material actualizado exitosamente', 'SUCCESS')
  }

  handleUpdateMaterialFail = (error_message) => {
    console.log(error_message)
  }

  handleUpdateMaterial = (event) => {
    event.preventDefault();
    let name = (this.state.newMaterial.name == this.state.originalMaterial.name) ? null : this.state.newMaterial.name;
    let description = (this.state.newMaterial.description == this.state.originalMaterial.description) ? null : this.state.newMaterial.description;
    let price_per_kilogram = (this.state.newMaterial.price_per_kilogram == this.state.originalMaterial.price_per_kilogram) ? null : this.state.newMaterial.price_per_kilogram;
    updateMaterial(
      this.handleUpdateMaterialSuccess,
      this.handleUpdateMaterialFail,
      this.state.newMaterial.id,
      name,
      description,
      price_per_kilogram,
      sessionStorage.getItem('token'),
    );
  }

  handleGetMaterialSuccess = (response) => {
    this.setState({
      'originalMaterial': response,
      'newMaterial': response,
    });
  }

  handleGetMaterialFail = (error_message) => {
    console.log(error_message);
  }

  fieldChanged = () => {
    let response = false;
    for (let [key, value] of Object.entries(this.state.originalMaterial)) {
      if (this.state.newMaterial[key] != value){
        response = true;
      }
    }
    return response
  }

  handleGetCategories = (categories) => {
    this.setState(categories);
  }

  handleGetCategoriesError = (error_message) => {
    console.log(error_message);
  }

  componentDidMount () {
    getMaterialById(
      this.handleGetMaterialSuccess,
      this.handleGetMaterialFail,
      this.props.materialId,
      sessionStorage.getItem('token'),
    );
  }

    onChangeName = ({
        target: {
          value: name,
        },
      }) => {
      let material = JSON.parse(JSON.stringify(this.state.newMaterial));
      material.name = name;
      this.setState({'newMaterial': material});
    }

    onChangeDescription = ({
        target: {
          value: description,
        },
      }) => {
      let material = JSON.parse(JSON.stringify(this.state.newMaterial));
      material.description = description;
      this.setState({'newMaterial': material});
    }

    onChangePricePerKilogram = ({
        target: {
          value: price_per_kilogram,
        },
      }) => {
      let material = JSON.parse(JSON.stringify(this.state.newMaterial));
      material.price_per_kilogram = price_per_kilogram;
      this.setState({'newMaterial': material});
    }

  render () {
    this.setState({'showUpdateButton': this.fieldChanged()});
    return (
      <div>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">{this.state.newMaterial.name}</h1>
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
                  placeholder=""
                  value={this.state.newMaterial.name}
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
                  placeholder=""
                  value={this.state.newMaterial.description}
                  onChange={this.onChangeDescription}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="input_price_per_kilogram">Precio por kilogramo</label>
                <input
                  type="number"
                  className="form-control"
                  id="input_price_per_kilogram"
                  aria-describedby="pricePerKilogramHelp"
                  placeholder=""
                  value={this.state.newMaterial.price_per_kilogram}
                  onChange={this.onChangePricePerKilogram}
                  />
              </div>

              {
                this.state.showUpdateButton ?
                <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={ (event) => this.handleUpdateMaterial(event) }
                >Actualizar</button> : ''
              }
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default MaterialUpdateComponent;
