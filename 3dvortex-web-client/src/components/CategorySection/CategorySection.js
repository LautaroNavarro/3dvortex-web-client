import React, { PureComponent }from 'react';
import HorizontalSection from '../HorizontalSection/HorizontalSection';
import GeneralContext from '../../components/Layout/GeneralContext';
import CategorySectionItem from './CategorySectionItem/CategorySectionItem';
import { listCategories } from '../../sdk/categories';

class CategorySection extends PureComponent {

    state = {
      categories: [],
    }

    static contextType = GeneralContext;

    handleGetCategories = (categories) => {
      this.setState(categories);
    }

    handleGetCategoriesError = (error_message) => {
      const { raiseAlert } = this.context;

      raiseAlert(error_message, 'DANGER');

    }

    componentDidMount() {
      listCategories(this.handleGetCategories, this.handleGetCategoriesError);
    }


    render () {
        return (
          <HorizontalSection text={this.props.text}>
               {
                    this.state.categories.map(
                        (category) => (
                            category.father_category_id ?
                            ''  : <CategorySectionItem key={ category.id } url={`/search-models?category_id=${category.id}`} name={ category.name } />
                        )
                    )
                  }
          </HorizontalSection>
        );
    }
}
export default CategorySection;
