import React, {PureComponent} from 'react';
import { getCategoryById } from '../../../sdk/getCategoryById';
import { updateCategory } from '../../../sdk/updateCategory';
import { listCategories } from '../../../sdk/categories';
import classes from '../Admin.module.css';
import SimpleModal from '../../../components/Modal/SimpleModal';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import OutlineSecondaryButton from '../../../components/Buttons/OutlineSecondaryButton';
import GeneralContext from '../../../components/Layout/GeneralContext';


class CategoryUpdateComponent extends PureComponent {

  static contextType = GeneralContext;

  state = {
    'originalCategory': {
      'id': '',
      'name': '',
      'father_category_id': 0,
    },
      'newCategory': {
        'id': '',
        'name': '',
        'father_category_id': 0,
    },
    'showUpdateButton': false,
    'categories': [],
  }

  handleUpdateCategorySuccess = () => {
    const {raiseAlert} = this.context;
    raiseAlert('Categoria actualizada exitosamente', 'SUCCESS')
  }

  handleUpdateCategoryFail = (error_message) => {
    console.log(error_message)
  }

  handleUpdateCategory = (event) => {
    event.preventDefault();
    let name = (this.state.newCategory.name == this.state.originalCategory.name) ? null : this.state.newCategory.name;
    let father_category_id = (this.state.newCategory.father_category_id == this.state.originalCategory.father_category_id) ? null : this.state.newCategory.father_category_id;
    updateCategory(
      this.handleUpdateCategorySuccess,
      this.handleUpdateCategoryFail,
      this.state.newCategory.id,
      name,
      father_category_id,
      sessionStorage.getItem('token'),
    );
  }

  handleGetCategorySuccess = (response) => {
    this.setState({
      'originalCategory': response,
      'newCategory': response,
    });
  }

  handleGetCategoryFail = (error_message) => {
    console.log(error_message);
  }

  fieldChanged = () => {
    let response = false;
    for (let [key, value] of Object.entries(this.state.originalCategory)) {
      if (this.state.newCategory[key] != value){
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
    getCategoryById(
      this.handleGetCategorySuccess,
      this.handleGetCategoryFail,
      this.props.categoryId,
      sessionStorage.getItem('token'),
    );
    listCategories(this.handleGetCategories, this.handleGetCategoriesError);
  }

    onChangeName = ({
        target: {
          value: name,
        },
      }) => {
      let category = JSON.parse(JSON.stringify(this.state.newCategory));
      category.name = name;
      this.setState({'newCategory': category});
    }

    onChangeFatherCategory = (e) => {
      let category = JSON.parse(JSON.stringify(this.state.newCategory));
      category.father_category_id = e.target.value;
      this.setState({'newCategory': category});
    }

  render () {
    this.setState({'showUpdateButton': this.fieldChanged()});
    return (
      <div>
        <div>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">{this.state.newCategory.name}</h1>
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
                  value={this.state.newCategory.name}
                  onChange={this.onChangeName}
                  />
              </div>
              <select className='custom-select' id='inputGroupSelect01' onChange={ (e) => this.onChangeFatherCategory(e) }>
                <option value={0} defaultValue >Sin categoria</option>
                {this.state.categories.map( (category) =>
                  {
                    if (this.state.newCategory.father_category_id == category.id) {
                      return <option value={category.id} selected>{category.name}</option>
                    } else {
                      return <option value={category.id}>{category.name}</option>
                    }
                  }
                )}
              </select>
              {
                this.state.showUpdateButton ?
                <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={ (event) => this.handleUpdateCategory(event) }
                >Actualizar</button> : ''
              }
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default CategoryUpdateComponent;
