import React from "react";

export default function Banner(){
    return <>
    {/* Start Banner Hero */}
    <div
      id="template-mo-zay-hero-carousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-bs-target="#template-mo-zay-hero-carousel"
          data-bs-slide-to={0}
          className="active"
        />
        <li
          data-bs-target="#template-mo-zay-hero-carousel"
          data-bs-slide-to={1}
        />
        <li
          data-bs-target="#template-mo-zay-hero-carousel"
          data-bs-slide-to={2}
        />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="container">
            <div className="row p-5">
              <div className="mx-auto col-md-8 col-lg-8 order-lg-last">
                <img
                  className="img-fluid"
                  src="./assets/img/banner_img_01.jpg"
                  alt=""
                />
              </div>
              <div className="col-lg-4 mb-0 d-flex align-items-center">
                <div className="text-align-left align-self-center">
                  <h1 className="h1 text-success">
                    <b>Handicraft</b> Mall
                  </h1>
                  <h3 className="h2">Made With Care</h3>
                  <p>
                  An exquisite range of wall hangings, showpieces, and decorative vases add a touch of elegance to your living space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="container">
            <div className="row p-5">
              <div className="mx-auto col-md-8 col-lg-8 order-lg-last">
                <img
                  className="img-fluid"
                  src="./assets/img/banner_img_02.jpg"
                  alt=""
                />
              </div>
              <div className="col-lg-4 mb-0 d-flex align-items-center">
                <div className="text-align-left">
                <h1 className="h1 text-success">
                    <b>Handicraft</b> Mall
                  </h1>
                  <h3 className="h2">Made With Care</h3>
                  <p>
                  An exquisite range of wall hangings, showpieces, and decorative vases add a touch of elegance to your living space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="container">
            <div className="row p-5">
              <div className="mx-auto col-md-8 col-lg-8 order-lg-last">
                <img
                  className="img-fluid"
                  src="./assets/img/banner_img_03.jpg"
                  alt=""
                />
              </div>
              <div className="col-lg-4 mb-0 d-flex align-items-center">
                <div className="text-align-left">
                <h1 className="h1 text-success">
                    <b>Handicraft</b> Mall
                  </h1>
                  <h3 className="h2">Made With Care</h3>
                  <p>
                  An exquisite range of wall hangings, showpieces, and decorative vases add a touch of elegance to your living space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev text-decoration-none w-auto ps-3"
        href="#template-mo-zay-hero-carousel"
        role="button"
        data-bs-slide="prev"
      >
        <i className="fas fa-chevron-left" />
      </a>
      <a
        className="carousel-control-next text-decoration-none w-auto pe-3"
        href="#template-mo-zay-hero-carousel"
        role="button"
        data-bs-slide="next"
      >
        <i className="fas fa-chevron-right" />
      </a>
    </div>
    {/* End Banner Hero */}
  </>
  
}