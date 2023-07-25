import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addItemIntoCart, updateCartItems } from "../../redux-config/CartSlice";
import { fetchWishlist, removeWishlistItem } from "../../redux-config/wishlistSlice";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import "./wishlist.css";
import WishlistEmpty from "./WishlistEmpty";
export default function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlistData, wishlistError, flag } = useSelector((state) => state.wishlist);
  const { currentCustomer } = useSelector((state) => state.customer);
  const { cartItems, cartError } = useSelector((state) => state.cart);
 
  const addToCart = (products) => {
    if (!currentCustomer) toast.warning("Please Login For cart");
    else {
      let status = true;
      if (cartItems.length != 0)
        status = cartItems.some((item) => item.productId._id == products._id);
      else status = false;
      if (status) toast.info("Item is already added in cart");
      else {
        dispatch(
          addItemIntoCart({
            customerId: currentCustomer._id,
            productId: products._id,
          })
        );
        if (!cartError) {
          dispatch(updateCartItems(products));
          toast.success("Item Successfuly Added in Cart");
        }
        else {
          toast.error("!Oop somthing went wrong");
        }
      }
    }
  };
  const wishList = ()=>{ 
  dispatch(fetchWishlist({ customerId: currentCustomer?._id }));
};
  const productDescriptionId = (productDid) => {
    navigate("/productdescription", { state: { productDetail: productDid } });
  };

  const deletefromWishlist = async(product)=>{
    alert("Are you sure ?")
    

    dispatch(removeWishlistItem(product));
    let response=await axios.post("http://localhost:3000/wishlist/delete",{customerId:currentCustomer._id,productId:product._id})
    if(response.data){
      toast.error(`item is removed from the Wishlist`)
      wishList()
     
    }
  }
   console.log(wishlistData)
   useEffect(()=>{
    wishList();
   },[])
  return <>
    <Header />
    <Navigation />
    <div className="cart-wrap">
      <div className="container">
        <div className="row">

          <div className="main-heading mb-10 text-center" >My wishlist</div>
          <div className="col-lg-9">
           
          </div>


        </div>
        <div className="row">
              <div className="container">
              {(!currentCustomer)&& <WishlistEmpty/>||wishlistData.length==0&& <WishlistEmpty/>}

              <div className="row">
                {currentCustomer&&wishlistData.map((products, index) =>
                  <div key={index} className="col-md-4">
                    <div
                      className="card mb-4 product-wap rounded-0"
                      style={{ height: "500px" }}
                    >
                      <div className="card rounded-0">
                        <img
                          className="card-img rounded-1  img-fluid"
                          style={{ height: "300px" }}
                          src={products.productId?.thumbnail}
                        />
                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                          <ul className="list-unstyled">
                          <li>
                            <a
                             onClick = {()=>deletefromWishlist(products)}
                              className="btn btn-success text-white"
                            >
                              <i i class="fa fa-trash" aria-hidden="true"></i>

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
                          {products.productId.title}
                        </a>
                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                          <li>
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-muted fa fa-star" />
                            <i className="text-muted fa fa-star" />
                          </li>
                        </ul>
                        <p className="text-center mb-0">{products.productId?.price}</p>
                      </div>
                    </div>
                  </div>
                )}
                </div>
               
              </div>
            </div>

      </div>
    </div>
    <Footer />
  </>
}