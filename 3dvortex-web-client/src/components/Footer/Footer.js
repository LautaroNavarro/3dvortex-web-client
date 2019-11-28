import React, {PureComponent} from 'react';
import Container from '../../hoc/Container';
import Row from '../../hoc/Row';
import classes from './Footer.module.css';


class Footer extends PureComponent {
    render () {
        return (
          <footer className="font-small cyan bg-dark text-light text-center">
            <Container>
              <Row>
                <div className="col-md-12 mt-5">
                  <div className="mb-5 flex-center">
                    <a className={`fb-ic ${classes.LinkIcons}`} href="/">
                      <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                    </a>
                    <a className={`tw-ic ${classes.LinkIcons}`} href="/">
                      <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                    </a>
                    <a className={`gplus-ic ${classes.LinkIcons}`} href="/">
                      <i className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                    </a>
                    <a className={`li-ic ${classes.LinkIcons}`} href="/">
                      <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                    </a>
                    <a className={`ins-ic ${classes.LinkIcons}`} href="/">
                      <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                    </a>
                    <a className={`pin-ic ${classes.LinkIcons}`} href="/">
                      <i className="fab fa-pinterest fa-lg white-text fa-2x"></i>
                    </a>
                  </div>
                </div>
              </Row>
              <Row>
                  <div className="col-12">
                      <div className="footer-copyright text-center py-3">© 2019 Copyright:
                        <a href="/"> 3dvortex.com</a>
                      </div>
                  </div>
              </Row>
            </Container>
          </footer>
        );
    }
}

export default Footer;
