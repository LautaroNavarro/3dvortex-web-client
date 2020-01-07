import React, {PureComponent} from 'react';
import Container from '../../hoc/Container';
import NavBarBrand from './components/NavBarBrand';
import NavBarSearch from './components/NavBarSearch';
import DropDown from '../DropDown/DropDown';
import DropDownItem from '../DropDown/DropDownItem';
import NavBarItem from './components/NavBarItem';
import NavBarItemList from './components/NavBarItemList';
import ShoppingCartIcon from '../Icons/ShoppingCartIcon';
import GeneralContext from '../../components/Layout/GeneralContext';
import { listCategories } from '../../sdk/categories';

class NavBar extends PureComponent {

    static contextType = GeneralContext;

    state = {
      categories: [],
    }

    logOut (e) {
      sessionStorage.removeItem('token');
    }

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
        const { user } = this.context;
        return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Container>
                <NavBarBrand link="/">3D VORTEX</NavBarBrand>
                <NavBarSearch />
                <DropDown name="Categorias">
                  {
                    this.state.categories.map((category) => (
                      category.father_category_id ?
                      ''  : <DropDownItem link="/" key={ category.id }>{ category.name }</DropDownItem>))
                  }
                </DropDown>
                <NavBarItemList>
                  { this.props.isLoggedIn ? '' : <NavBarItem link="/signin">Crea tu cuenta</NavBarItem>}
                  { this.props.isLoggedIn ? '' : <NavBarItem link="/login">Ingresa</NavBarItem>}
                  { this.props.isLoggedIn ? <NavBarItem link="/"><ShoppingCartIcon /></NavBarItem> : ''}
                  { this.props.isLoggedIn ? (
                    <DropDown name={ `${user.name} ${user.lastname}` }>
                      <DropDownItem link="#" onClickHandler={ () => this.logOut() }>Salir</DropDownItem>
                    </DropDown>
                  ) : '' }
                </NavBarItemList>
            </Container>
          </nav>
        );
    }
}

export default NavBar;
