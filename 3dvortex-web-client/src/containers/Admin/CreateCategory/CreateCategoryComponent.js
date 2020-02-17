import React, {PureComponent} from 'react';
import { listCategories } from '../../../sdk/categories';
import { createCategory } from '../../../sdk/createCategory';
import classes from '../Admin.module.css';
import SimpleModal from '../../../components/Modal/SimpleModal';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../../components/Layout/GeneralContext';


class CreateCategoryComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
      'category': {
        'name': '',
        'father_category_id': null,
    },
    'showUpdateButton': false,
    'categories': [],
  }

  handleUpdateCategorySuccess = () => {
    const {raiseAlert} = this.context;
    raiseAlert('Impresora creada exitosamente', 'SUCCESS')
  }

  handleUpdateCategoryFail = (error_message) => {
    console.log(error_message)
  }

  validateForm = () => {
    if (this.state.category.name == '') {
      return { valid: false, errorMessage: 'name is required'};
    }
    return { valid: true, errorMessage: null};
  }

  handleCreateCategorySucess = (response) => {
    const {setRedirect} = this.context;
    setRedirect('/admin/categories');
  }

  handleCreateCategoryFail (error_message) {
    console.log(error_message);
  }

  handleCreateCategory = (event) => {
    event.preventDefault();
    let {valid, errorMessage} = this.validateForm();

    if (valid) {
      createCategory(
        this.handleCreateCategorySucess,
        this.handleCreateCategoryFail,
        this.state.category.name,
        this.state.category.father_category_id,
        sessionStorage.getItem('token'),
      );
    } else {
      const {raiseAlert} = this.context;
      raiseAlert(errorMessage, 'DANGER');
    }
  }

  handleGetCategories = (categories) => {
    this.setState(categories);
  }

  handleGetCategoriesError = (error_message) => {
    console.log(error_message);
  }

  componentDidMount () {
    listCategories(this.handleGetCategories, this.handleGetCategoriesError);
  }

    onChangeName = ({
        target: {
          value: name,
        },
      }) => {
      let category = JSON.parse(JSON.stringify(this.state.category));
      category.name = name;
      this.setState({'category': category});
    }

    onChangeFatherCategory = (e) => {
      let category = JSON.parse(JSON.stringify(this.state.newCategory));
      category.father_category_id = e.target.value;
      this.setState({'newCategory': category});
    }

  render () {
    return (
      <div>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Crear Categoria</h1>
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
                  value={this.state.category.name}
                  onChange={this.onChangeName}
                  />
              </div>

              <select className='custom-select' id='inputGroupSelect01' onChange={ (e) => this.onChangeFatherCategory(e) }>
                <option value={0} defaultValue >Sin categoria</option>
                {this.state.categories.map( (category) =>
                  {
                    if (this.state.category.father_category_id == category.id) {
                      return <option value={category.id} selected>{category.name}</option>
                    } else {
                      return <option value={category.id}>{category.name}</option>
                    }
                  }
                )}
              </select>

              <button
                className="btn btn-primary btn-block mt-4"
                onClick={ (event) => this.handleCreateCategory(event) }
              >
              Crear Categoria
              </button>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default CreateCategoryComponent;
