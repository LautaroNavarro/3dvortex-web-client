import React from 'react';

const Carousel = (props) => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-73673930-3ac8-49d4-ae7d-176a661fb1d2.jpg" alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLA-especial-juguetes/b88d5810-af0c-11e9-b903-918bb14d48d1-home-slider_desktop.jpg" alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-e193b3bc-25f8-4b12-9f1c-4e16c5c92262.jpg" alt="Third slide" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
    );
}

export default Carousel;
