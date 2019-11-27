import React from 'react';
import Aux from './../../hoc/Aux.js';
import Container from '../../hoc/Container';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import classes from './Layout.module.css';

const Layout = (props) => {
    return (
        <Aux>
            <NavBar />
            {/*<div>Toolbar, SideDrawer, Backdrop</div>*/}
            <Container className={classes.Main}>
                {props.children}
            </Container>
            <Footer />
        </Aux>
    );
}

export default Layout;