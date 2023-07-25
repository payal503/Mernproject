import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "../search/SearchModal";
import Navigation from "../navigation/Navigation";
import Header from "../header/Header";
import { ToastContainer, toast } from "react-toastify";
import { addItemIntoCart, updateCartItems } from "../../redux-config/CartSlice";
import "react-toastify/dist/ReactToastify.css";
import api from "../../WebApi/api";
import {
  addItemInWishlist,
  updateWishlistItems,
} from "../../redux-config/wishlistSlice";
import CircularStatic from "../../SellerComponents/spinner/Spinner";
import { Rating } from "@mui/material";
import Loader from "../Spinner/Loader";
export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCustomer } = useSelector((state) => state.customer);
  const { categoryList, error, isLoading } = useSelector(
    (state) => state.category
  );
  const { cartItems, cartError } = useSelector((state) => state.cart);
  const { wishlistData, wishlistError } = useSelector(
    (state) => state.wishlist
  );
  const categoryDetail = location.state?.category;
  const categoryid = categoryDetail?._id;

  const [products, setProducts] = useState([]);
  const productList = async () => {
    try {
      let response = await axios.get(api.VIEW_ALL_PRODUCT);

      setProducts(response.data.products);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const searchFilter = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await axios.get(api.SERACH_FILTER + `${key}`);

      if (result) setProducts(result.data.Product);
    } else {
      productList();
    }
  };

  const categroyFilter = async (key) => {
    let result = await axios.get(api.PRODUCT_BY_CATEGORY + `${key}`);

    if (!result.data.products.length == 0) {
      setProducts(result.data.products);
    } else {
      productList();
    }
  };

  const categroyFilterFromHome = async () => {
    let result = await axios.get(
      api.PRODUCT_BY_HOME_CATEGORY + `${categoryid}`
    );
    setProducts(result.data.products);
  };

  const productDescriptionId = (productDid) => {
    navigate("/productdescription", { state: { productDetail: productDid } });
  };

  ///Cart COde:
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
        dispatch(
          addItemIntoCart({
            customerId: currentCustomer._id,
            productId: products._id,
          }))
      } else {
        toast.error("!Oop somthing went wrong");
      }
    }
  };
  const addWishlistdata = (products) => {
    if (!currentCustomer) toast.warning("Please Login First");
    else {
      let status = true;
      if (wishlistData.length != 0)
        status = wishlistData?.wishlistItems?.some(
          (item) => item?.productId?._id == products._id
        );
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
        } else {
          toast.error("!Oop somthing went wrong");
        }
      }
    }
  };

  useEffect(() => {
    productList();
    if (categoryid) {
      categroyFilterFromHome();
    } else {
      productList();
    }
  }, []);

  return (
    <>
      {/* Start Content */}
      <Header />
      <Navigation />
      <ToastContainer />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <h1 className="h2 pb-4">Categories</h1>
            <ul className="list-unstyled templatemo-accordion">
              <Link
                to={"/infinitProduct"}
                className="h3 text-dark text-decoration-none mr-3"
              >
                <li className="pb-3">All</li>
              </Link>
              {categoryList.map((category) => (
                <Link
                  onClick={() => categroyFilter(category._id)}
                  className="h3 text-dark text-decoration-none mr-3"
                >
                  <li className="pb-3">{category.categoryName}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div className="col-md-6">
                <ul className="list-inline shop-top-menu pb-3 pt-1">
                  <li className="list-inline-item">
                    <form
                      action=""
                      method="get"
                      className="modal-content modal-body border-0 p-0"
                    >
                      <div className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          id="inputModalSearch"
                          name="q"
                          placeholder="Search ..."
                          onChange={searchFilter}
                        />
                        <button
                          type="submit"
                          className="input-group-text bg-success text-light"
                        >
                          <i className="fa fa-fw fa-search text-white" />
                        </button>
                      </div>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
            {products && (
              <div className="row">
                {products.map((products, index) => (
                  <div key={index} className="col-md-4">
                    <div
                      className="card mb-4 product-wap rounded-0"
                      style={{ height: "500px" }}
                    >
                      <div className="card rounded-0">
                        <img
                          className="card-img rounded-1  img-fluid"
                          style={{ height: "300px" }}
                          src={products.thumbnail}
                          alt=""
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
                        <a
                          href="shop-single.html"
                          className="h3 text-decoration-none"
                        >
                          {products.title.substring(0, 60)}
                        </a>
                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                          <Rating
                            name="half-rating-read"
                            defaultValue={products.rating}
                            precision={0.5}
                            readOnly
                          />
                        </ul>
                        <p className="text-center mb-0">₹{products.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!products.length && (
              <div className="row">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* End Content */}
    </>
  );
}
