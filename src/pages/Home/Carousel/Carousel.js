import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBIcon,
} from 'mdb-react-ui-kit';
import banner1 from "../../../assets/images/banner4.jpg";
import banner2 from "../../../assets/images/banner5.jpg";
import banner3 from "../../../assets/images/banner4.jpg";

const Carousel= () => {
  return (
    // <MDBCarousel showControls showIndicators classNameName="mt-70">
    //   <MDBCarouselItem
    //     classNameName="w-100 d-block"
    //     itemId={1}
    //     src={banner1}
    //     alt=""
    //   />
    //   <MDBCarouselItem
    //     classNameName="w-100 d-block"
    //     itemId={2}
    //     src= {banner2}
    //     alt=""
    //   />
    //   <MDBCarouselItem
    //     classNameName="w-100 d-block"
    //     itemId={3}
    //     src={banner3}
    //     alt=""
    //   />
    // </MDBCarousel>

    <div id="carouselExampleCaptions" className="carousel slide mt-70" data-mdb-ride="carousel" >
  <div className="carousel-indicators">
    <button
      type="button"
      data-mdb-target="#carouselExampleCaptions"
      data-mdb-slide-to="0"
      className="active"
      aria-current="true"
      aria-label="Slide 1"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselExampleCaptions"
      data-mdb-slide-to="1"
      aria-label="Slide 2"
    ></button>
    <button
      type="button"
      data-mdb-target="#carouselExampleCaptions"
      data-mdb-slide-to="2"
      aria-label="Slide 3"
    ></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={banner1} className="d-block w-100" alt="Wild Landscape"/>
    </div>
    <div className="carousel-item">
      <img src={banner2} className="d-block w-100" alt="Camera"/>
    </div>
    <div className="carousel-item">
      <img src={banner3} className="d-block w-100" alt="Exotic Fruits"/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="prev">
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-mdb-target="#carouselExampleCaptions" data-mdb-slide="next">
    <span className="visually-hidden">Next</span>
  </button>
</div>
  );
}
export default Carousel;