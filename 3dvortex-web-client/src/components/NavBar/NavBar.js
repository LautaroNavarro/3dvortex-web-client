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
      const {setRedirect} = this.context;
      setRedirect('/login');
    }

    redirectToManageAddresses (e) {
      const {setRedirect} = this.context;
      setRedirect('/manage-addresses');
    }

    redirectToManageModels (e) {
      const {setRedirect} = this.context;
      setRedirect('/manage-models');
    }

    redirectToAdminUsers () {
      const {setRedirect} = this.context;
      setRedirect('/admin/users');
    }

    redirectToAdminModels () {
      const {setRedirect} = this.context;
      setRedirect('/admin/models');
    }

    redirectToAdminPrinters () {
      const {setRedirect} = this.context;
      setRedirect('/admin/printers');
    }

    redirectToHome (e) {
      const {setRedirect} = this.context;
      setRedirect('/');
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

    isAdmin(user) {
      return ( user.access_level > 0 );
    }

    render () {
        const { user } = this.context;
        return (
          <nav className={ `navbar navbar-expand-lg ${( this.isAdmin(user) ) ? 'navbar-dark bg-dark' : 'navbar-light bg-light' }` }>
              <Container>
                <NavBarBrand handler={() => this.redirectToHome() }>3D VORTEX</NavBarBrand>
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
                  { this.props.isLoggedIn && this.isAdmin(user) ?
                    <DropDown name='Admin'>
                      <DropDownItem onClickHandler={ () => this.redirectToAdminUsers()} >Usuarios</DropDownItem>
                      <DropDownItem onClickHandler={ () => this.redirectToAdminModels()} >Modelos</DropDownItem>
                      <DropDownItem >Impresiones</DropDownItem>
                      <DropDownItem onClickHandler={ () => this.redirectToAdminPrinters()}>Impresoras</DropDownItem>
                    </DropDown> : ''
                  }
                  { this.props.isLoggedIn ? <NavBarItem link="/"><ShoppingCartIcon /></NavBarItem> : ''}
                  { this.props.isLoggedIn ? (
                    <DropDown name={ `${user.name} ${user.lastname}` }>
                      <DropDownItem onClickHandler={ () => this.redirectToManageModels() }>Mis modelos</DropDownItem>
                      <DropDownItem onClickHandler={ () => this.redirectToManageAddresses() }>Mis direcciones</DropDownItem>
                      <DropDownItem onClickHandler={ () => this.logOut() }>Salir</DropDownItem>
                    </DropDown>
                  ) : '' }
                </NavBarItemList>
            </Container>
          </nav>
        );
    }
}

export default NavBar;
