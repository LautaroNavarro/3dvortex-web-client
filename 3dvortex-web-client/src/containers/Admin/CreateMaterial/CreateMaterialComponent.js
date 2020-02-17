import React, {PureComponent} from 'react';
import { listCategories } from '../../../sdk/categories';
import { createMaterial } from '../../../sdk/createMaterial';
import classes from '../Admin.module.css';
import SimpleModal from '../../../components/Modal/SimpleModal';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../../components/Layout/GeneralContext';


class CreateMaterialComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'material': {
      'name': '',
      'description': '',
      'price_per_kilogram': '',
    },
    'showUpdateButton': false,
  }

  handleCreateMaterialSucess = (response) => {
    const { setRedirect } = this.context;
    setRedirect('/admin/materials');
  }

  handleCreateMaterialFail = (error_message) => {
    console.log(error_message);
  }

  validateForm = () => {
    try {
      parseFloat(this.state.material.price_per_kilogram);
      if (this.state.material.name != '') {
        return { valid: true, errorMessage: ''};
      } else {
        return { valid: false, errorMessage: 'Name is required'};
      }
    }
    catch(err) {
      return { valid: false, errorMessage: 'Price per kilogram must be a number'};
    }
  }

  handleCreateMaterial = (event) => {
    event.preventDefault();
    let {valid, errorMessage} = this.validateForm();

    if (valid) {
      createMaterial(
        this.handleCreateMaterialSucess,
        this.handleCreateMaterialFail,
        this.state.material.name,
        this.state.material.description,
        this.state.material.price_per_kilogram,
        sessionStorage.getItem('token'),
      );
    } else {
      const {raiseAlert} = this.context;
      raiseAlert(errorMessage, 'DANGER');
    }
  }

    onChangeName = ({
        target: {
          value: name,
        },
      }) => {
      let material = JSON.parse(JSON.stringify(this.state.material));
      material.name = name;
      this.setState({'material': material});
    }

    onChangeDescription = ({
        target: {
          value: description,
        },
      }) => {
      let material = JSON.parse(JSON.stringify(this.state.material));
      material.description = description;
      this.setState({'material': material});
    }

    onChangePricePerKilogram = ({
        target: {
          value: price_per_kilogram,
        },
      }) => {
      let material = JSON.parse(JSON.stringify(this.state.material));
      material.price_per_kilogram = price_per_kilogram;
      this.setState({'material': material});
    }

  render () {
    return (
      <div>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Crear Material</h1>
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
                  value={this.state.material.name}
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
                  value={this.state.material.description}
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
                  value={this.state.material.price_per_kilogram}
                  onChange={this.onChangePricePerKilogram}
                  />
              </div>

              <button
                className="btn btn-primary btn-block mt-4"
                onClick={ (event) => this.handleCreateMaterial(event) }
              >
              Crear Material
              </button>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default CreateMaterialComponent;
