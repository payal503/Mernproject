import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import Navigation from "../../navigation/Navigation";
import Footer from "../../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import {
  addItemIntoCart,
  clearAllCart,
  decreaseCartQuantity,
  fetchCart,
  getTotal,
  incareaseCartQuantity,
  removeCartItem,
  updateCartItems,
} from "../../../redux-config/CartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import CircularStatic from "../../../SellerComponents/spinner/Spinner";
import "../Cart/cart.css"
import { ToastContainer } from "react-toastify";
import CartEmpty from "./CartEmpty";
import axios from "axios";



export default function Cart() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [cartSummary, setCartSummary] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const { currentCustomer } = useSelector((state) => state.customer);
  const productids = cartItems.map((product) => product.productId._id);
  const productqty = cartItems.map((product) => product.quantity);

  const SHIPPING_FEES = 60;
  function handleRemoveItem(cartItem) {
    dispatch(decreaseCartQuantity(cartItem));
  }
  function handleAddItem(cartItem) {
    dispatch(incareaseCartQuantity(cartItem));
  }
  function clearCart(cartItem) {
    dispatch(clearAllCart(cartItem));
  }
  const removeCartItems=async(cartItem)=>{
    dispatch(removeCartItem(cartItem));
    let response=await axios.post("http://localhost:3000/cart/deleteproduct",{customerId:currentCustomer._id,productId:cartItem._id})
    console.log(response)
  }

  const orderpackage = { cartitems: cartItems, billamount: totalAmount, SHIPPING_FEES: SHIPPING_FEES };

  const checkout = async (orderpackage) => {
    navigate("/checkout", { state: { orderpackage: orderpackage } });
  };

  React.useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  return (
    <>
      <ToastContainer />
      <Header />
      <Navigation />
      
      

      <section className="auto" style={{ backgroundColor: "whitesmoke" }}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <br />
              <p>
                <span className="h2">Shopping Cart </span>
                <span className="h4"></span>
              </p>
              {!cartItems.length &&<CartEmpty/>}
              {cartItems.length&&<div className="card mb-4">
                <div className="card-body p-4">
                  {!cartItems && <CircularStatic />}
                  {cartItems.map((items, index) => (
                    <div className="row align-items-center p-2">
                      <div
                        className="row align-items-center"
                        style={{
                          boxShadow: "1px 1px 10px",
                          borderRadius: ".5rem",
                        }}
                      >
                        <div className="col-md-2 p-2 ">
                          <img
                            src={items.productId?.thumbnail}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Title</p>
                            <p className="lead fw-normal mb-0">
                              {items.productId?.title}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <p className="small text mb-4 pb-2">Quantity</p>
                            <div className="col-xl-1">
                              <div class="input-group">
                                <div class="input-group-prepend">
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      handleAddItem(items);
                                    }}
                                  >
                                    <Add color="primary" />
                                  </IconButton>
                                  <input
                                    type="text"
                                    className="quantity-value"
                                    pattern="[0-9]{2}"
                                    value={items.quantity}
                                  />
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      handleRemoveItem(items);
                                    }}
                                  >
                                    <Remove color="primary" />
                                  </IconButton>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Price</p>
                            <p className="lead fw-normal mb-0">
                              ₹{items.productId?.price}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Total</p>
                            <p className="lead fw-normal mb-0">
                              ₹ {items.productId.price * items.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-2 d-flex justify-content-center">
                          <div>
                            <p className="small text-muted mb-4 pb-2">Delete</p>
                            <Button
                              onClick={() => removeCartItems(items)}
                              variant="outlined"
                              color="error"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>}
            </div>
          </div>
        </section>
        {cartItems.length&&<div><div class="col-md-4">
          <div class="card mb-4">
            <div class="card-header py-3">
              <h5 class="mb-0">Summary</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products
                  <span> ₹{parseFloat(totalAmount).toFixed(2)}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span> ₹{SHIPPING_FEES}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p class="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>
                      {" "}
                      ₹{parseFloat(SHIPPING_FEES + totalAmount).toFixed(2)}
                    </strong>
                  </span>
                </li>
              </ul>

              <Button
                onClick={() => checkout(orderpackage)}
                variant="contained"
                color="success"
              >
                Checkout
              </Button>
              <Button
                onClick={() => clearCart()}
                variant="contained"
                color="warning"
                className="ml-3"
              >
                ClearCart
              </Button>
            </div>
          </div>
        </div>
      </div>}
     
      <Footer />
    </>
  );
}
