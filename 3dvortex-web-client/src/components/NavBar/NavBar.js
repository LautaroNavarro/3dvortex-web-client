import React, {PureComponent} from 'react';
import Container from '../../hoc/Container';
import NavBarBrand from './components/NavBarBrand';
import NavBarSearch from './components/NavBarSearch';
import DropDown from '../DropDown/DropDown';
import DropDownItem from '../DropDown/DropDownItem';
import NavBarItem from './components/NavBarItem';
import NavBarItemList from './components/NavBarItemList';
import ShoppingCartIcon from '../Icons/ShoppingCartIcon';

class NavBar extends PureComponent {
    render () {
        return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Container>
                <NavBarBrand link="/">3D VORTEX</NavBarBrand>
                <NavBarSearch />
                <DropDown name="Categorias">
                  <DropDownItem link="/">Animales</DropDownItem>
                  <DropDownItem link="/">Herramientas</DropDownItem>
                  <DropDownItem link="/">Colecciones</DropDownItem>
                </DropDown>
                <NavBarItemList>
                  <NavBarItem link="/">Crea tu cuenta</NavBarItem>
                  <NavBarItem link="/">Ingresa</NavBarItem>
                  <NavBarItem link="/"><ShoppingCartIcon /></NavBarItem>
                </NavBarItemList>
            </Container>
          </nav>
        );
    }
}

export default NavBar;
