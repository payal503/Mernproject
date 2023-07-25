import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addItemIntoCart } from "../../redux-config/CartSlice";
import { updateCartItems } from "../../redux-config/CartSlice";
import Navigation from "../navigation/Navigation";
import ReactImageMagnify from "react-image-magnify";
import axios from "axios";
import api from "../../WebApi/api";
import "../ProductPage/detail.css"

export default function ProductDescription() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetail = location.state.productDetail;
  const imageArray = productDetail.images;
  const { currentCustomer } = useSelector((state) => state.customer);
  const { cartItems, cartError } = useSelector((state) => state.cart);
  const [value, setValue] = React.useState(0);
  const [review,setReview]=React.useState();
  const [mainimage,setMainimage]=useState(productDetail.thumbnail)
  const dealOfTheDay=( productDetail.price -(productDetail.price * productDetail.discountPercentage) /100).toFixed(1)
  const SHIPPING_FEES = 60;
  const orderpackage = { cartitems:[{productId:productDetail}], billamount:dealOfTheDay, SHIPPING_FEES: SHIPPING_FEES };

  const addToCart = (products) => {
    if (!currentCustomer) {
      toast.warning("Please Login For cart");
    } else {
      dispatch(
        addItemIntoCart({
          customerId: currentCustomer._id,
          productId: products._id,
        })
      );
      if (!cartError) {
        dispatch(updateCartItems(products));
        toast.success("Item Successfuly Added in Cart");
        navigate("/cart");
      } else {
        toast.error("!Oop somthing went wrong");
      }
    }
  };
  function changeImage(smallimage) {
    setTimeout(()=>{
      setMainimage(smallimage)
    },500) 
}

  const buynow = () => {
    if (!currentCustomer)
      toast.warning("Please Login For cart");
    else 
      navigate("/checkout", { state: { orderpackage: orderpackage } });
    }
  // const handleClick = (i) => {
  //   console.log(i);
  // };

  const reviewDetail=async()=>{
   try{
    const response=await axios.get(api.VIEW_PRODUCT_BY_ID+`${productDetail._id}`)
    if(response.data.status){
      setReview(response.data.product)
    }
  }
  catch{
    toast.error("Something Went Wrong")
  }   
  }
  useEffect(()=>{
    reviewDetail()
  },[])
 
  return (
    <>
      <ToastContainer />
      <Navigation />
      <h3 className="text-center display-5">Product Description</h3>
      <div className="container-fluid mt-5">
        <div className="row col-lg-12">
          <div className="col-lg-12 d-flex">
            <div className="col-lg-1">
              <div className="col-lg-3 col-md-10">
                {imageArray.map((singleImage, index) => (
                  <img
                    key={index}
                    onMouseOver={() =>changeImage(singleImage) }
                    src={singleImage} alt="reload"
                    id="smallimage"
                    style={{ height: 70, width: 70 , borderRadius:"20%"}}
                    className="mb-3
                  mt-3" 
                  />
                ))}
              </div>
            </div>
            <div className="col-lg-5" >
              <ReactImageMagnify  
                 {...{
                  smallImage: {
                    alt: "gyi",
                    isFluidWidth: true,
                    src:mainimage,
                  },
                  largeImage: {
                    src: mainimage,
                    width: 1500,
                    height: 2000,
                  
                  },
                }} 
                style={{ zIndex: "2" }}   id="mainImage"
              />
            </div>
            <Col md={10}>
              <div className="col-lg-5 col-md-10 offset-1">
                <div className="col-lg-12 col-md-5 col-md-10">
                  <h6 className="disabled">
                    {productDetail.categoryId?.categoryName}
                  </h6>
                  <h4
                    className="title display-6"
                    style={{ color: "black", alignContent: "baseline" }}
                  >
                    {productDetail.title}
                  </h4>
                  <Rating
                    name="half-rating-read"
                    defaultValue={productDetail.rating}
                    precision={0.5}
                    readOnly
                  />
                  <small className="disabled">{productDetail.rating}</small>
                  <h5 style={{ color: "brown" }}>
                    {" "}
                    Deal of the day ₹
                    {(
                      productDetail.price -
                      (productDetail.price * productDetail.discountPercentage) /
                        100
                    ).toFixed(1)}
                  </h5>
                  <del>
                    <small style={{ color: "brown" }}>
                      Price:₹{productDetail.price}
                    </small>
                  </del>
                  <small className="title">
                    <br />
                    <i class="fa fa-check-circle" aria-hidden="true"></i> Made
                    in India
                    <br />
                    <small>
                      <i
                        class="fas fa-dot-circle    "
                        style={{ color: "green" }}
                      ></i>
                      In Stock({productDetail.stock})
                    </small>
                  </small>
                  <br />
                  <br />
                  <div className=" col-lg-12" style={{ alignContent: "left" }}>
                    <button
                      type="button"
                      onClick={() => addToCart(productDetail)}
                      name
                      id
                      className="col-lg-5 col-sm-12 btn btn-warning"
                    >
                      Add to Cart
                    </button>
                    <button
                     onClick={() => buynow(productDetail)}
                      type="button"
                      name
                      id
                      className="btn btn-success col-sm-12 col-lg-5 ml-2"
                    >
                      Buy Now
                    </button>
                  </div>
                  <br />
                  <div className="col-md-10 p-1">
                    <img
                      src="https://www.ecraftindia.com/cdn/shop/files/Authentic_product_black_100x100.jpg?v=1643437476"
                      className="img-fluid rounded-top col-md-3 p-1"
                      alt
                    />
                    <img
                      src="https://www.ecraftindia.com/cdn/shop/files/Free_Shipping_black_100x100.jpg?v=1643437500"
                      className="img-fluid rounded-top col-md-3 p-1"
                      alt
                    />
                    <img
                      src="https://www.ecraftindia.com/cdn/shop/files/make-in-india_f35f6d85-9268-422f-9dc6-c66787669bc5_100x100.jpg?v=1665206712"
                      className="img-fluid rounded-top col-md-3 p-1"
                      alt
                    />
                    <img
                      src="https://www.ecraftindia.com/cdn/shop/files/COD_Available_black_100x100.jpg?v=1643437514"
                      className="img-fluid rounded-top col-md-3 p-1"
                      alt
                    />
                  </div>
                  <br />
                </div>
                <small className="card-title">
                  Description:
                  <br />
                  {productDetail.description}
                </small>
              </div>
            </Col>
          </div>
        </div>
        <div className="card-body">
          <div>
            <main className="container">
              <h4 className="card-text">
                Product Reviews<i className="" aria-hidden="true"></i>
              </h4>
             
              <div className="card border-light">
                <div className="card-body">
                  <h4 className="card-title">Rating</h4>
                  <div className="table ">
                  <p className="card-text">
                 {review?.reviews.map((item,index)=><div><h6 key={index}>{item.customer.customerName }</h6>
                 <Rating
                    name="half-rating-read"
                    defaultValue={item.rating}
                    precision={0.5}
                    readOnly
                  /> 
                  <p>{item.comment}</p>
                 </div>)}
                  </p> 
                </div>
              </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
