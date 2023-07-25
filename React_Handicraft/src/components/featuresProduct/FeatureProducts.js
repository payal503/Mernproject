import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../featuresProduct/features.css"
import { Rating } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { addItemIntoCart, updateCartItems } from '../../redux-config/CartSlice'
import { addItemInWishlist, updateWishlistItems } from "../../redux-config/wishlistSlice";
import Navigation from "../navigation/Navigation";





export default function FeatureProducts() {
  const { featuresProductList, isLoading, error } = useSelector(state => state.featuresproduct)
  const { cartItems, cartError } = useSelector((state) => state.cart);
  const { currentCustomer } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addWishlistdata = (products) => {
    if (!currentCustomer) toast.warning("Please Login First");
    else {
      let status = true;
      if (cartItems.length != 0)
        status = cartItems?.some((item) => item?.productId?._id == products._id);
      else status = false;
      if (status) toast.info("Item is already added in wishlist");
      else {
        dispatch(
          addItemInWishlist({
            customerId: currentCustomer._id,
            productId: products._id,
          })
        );
        if (!cartError) {
          dispatch(updateWishlistItems(products));
          toast.success("Item Successfuly Added in wishlist");
        }
        else {
          toast.error("!Oop somthing went wrong");
        }
      }
    }
  }

  const productDescriptionId = (productDid) => {
    navigate("/productdescription", { state: { productDetail: productDid } });
  };
  


  const addToCart = (products) => {
    if (!currentCustomer) toast.warning("Please Login first");
    else {
      dispatch(
        addItemIntoCart({
          customerId: currentCustomer._id,
          productId: products._id,
        })
      );
      if (!cartError) {
        dispatch(updateCartItems(products));
        // toast.success("Item Successfuly Added in Cart");
      } else {
        toast.error("!Oop somthing went wrong");
      }
    };
  }
  return <>
    <section className="bg-light">
      <div className="container py-5">
        <div className="row text-center py-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Featured Product</h1>
            <p>
              Don’t miss out on these amazing deals
            </p>
          </div>
        </div>
        <div className="row">
          {!error && featuresProductList.map((products, index) =>
            <div className="col-md-3">
              <div className="card mb-4 product-wap rounded-0" style={{ height: "500px" }}>
                <div className="card rounded-0">
                  <img
                    className="card-img rounded-1  img-fluid" style={{ height: "300px" }}
                    src={products.thumbnail}
                  />
                  <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul className="list-unstyled">
                      <li>
                      <a
                            onClick={() => addWishlistdata(products)}
                            className="btn btn-success text-white"
                          >
                            <i className="far fa-heart" />
                          </a>
                      </li>
                      <li>
                      <button
                            className="btn btn-success text-white mt-2"
                            onClick={() => productDescriptionId(products)}
                          >
                            <i className="far fa-eye" />
                          </button>
                      </li>
                      <li>
                       
                          {/* <i className="fas fa-cart-plus" /> */}


                          <Link
                            onClick={() => addToCart(products)}
                            className="btn btn-success text-white mt-2"
                          >
                            <i className="fas fa-cart-plus" />
                          </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <a href="shop-single.html" className="h3 text-decoration-none">
                    {products.title.substring(0,50)}
                  </a>
                  <ul className="list-unstyled d-flex justify-content-center mb-1 mt-2">
                    <Rating name="half-rating-read" defaultValue={products.rating} precision={0.5} readOnly />

                  </ul>

                  <p className="text-center mb-0 mt-2">&#8377; {products.price}</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
    {/* End Featured Product */}
  </>


}
