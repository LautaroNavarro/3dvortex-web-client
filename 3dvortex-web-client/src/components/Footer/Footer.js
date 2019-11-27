import React, {PureComponent} from 'react';
import Container from '../../hoc/Container';
import Row from '../../hoc/Row';


class Footer extends PureComponent {
    render () {
        return (
          <footer class="page-footer font-small cyan bg-dark text-light text-center">
            <Container>
              <Row>
                <div class="col-md-12 mt-5">
                  <div class="mb-5 flex-center">
                    <a class="fb-ic">
                      <i class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                    </a>
                    <a class="tw-ic">
                      <i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                    </a>
                    <a class="gplus-ic">
                      <i class="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                    </a>
                    <a class="li-ic">
                      <i class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                    </a>
                    <a class="ins-ic">
                      <i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"></i>
                    </a>
                    <a class="pin-ic">
                      <i class="fab fa-pinterest fa-lg white-text fa-2x"></i>
                    </a>
                  </div>
                </div>
              </Row>
              <Row>
                  <div class="col-12">
                      <div class="footer-copyright text-center py-3">© 2019 Copyright:
                        <a href="#"> 3dvortex.com</a>
                      </div>
                  </div>
              </Row>
            </Container>
          </footer>
        );
    }
}

export default Footer;
