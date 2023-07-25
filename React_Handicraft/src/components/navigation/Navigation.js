import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../redux-config/CustomerSlice";
export default function Navigation() {
  const { currentCustomer } = useSelector(state => state.customer)
  const { cartItems } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const customerSignOut = () => {
    dispatch(signOut())

  }

  return (
    <>
      {/* Header */}

      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to={"/"}
            className="navbar-brand text-success logo h2 align-self-center"
          >
            <img
              src="./assets/img/logo1.png"
              style={{ width: "190px", height: "90px" }}
              className=""
              alt=""
            />
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/products" className="nav-link">
                    Shop
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html">
                    Contact
                  </a>
                </li>
                {currentCustomer&&<li className="nav-item">
                  <Link to="/orders" className="nav-link">
                    Orders
                  </Link>
                </li>}
                <li className="nav-item">
                  <Link to="/wishlist" className="nav-link">
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar align-self-center d-flex ml-5">
              {currentCustomer && <Link
                to="/cart"
                className="nav-icon position-relative text-decoration-none"
              >
                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
                <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                  {cartItems.length}
                </span>View Cart
              </Link>}
              {!currentCustomer && <Link
                to="/signin"
                className="nav-icon position-relative text-decoration-none"
              >
                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
                <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                  {cartItems.length}
                </span>View Cart
              </Link>}


              {!currentCustomer && <Link
                to="/signIn"
                className="nav-icon position-relative text-decoration-none"
              >
                <i className="fa fa-fw fa-user text-dark mr-3" />
                Signin
              </Link>}

              {currentCustomer && <Link
                onClick={customerSignOut}
                className="nav-icon position-relative text-decoration-none"
              >
                <i className="fa fa-fw fa-user text-dark mr-3" />
                SignOut
              </Link>
              }


              {!currentCustomer && <Link
                to="/signUp"
                className="nav-icon position-relative text-decoration-none"
              >
                <i className="fa fa-fw fa-user text-dark mr-3" />
                SignUp
              </Link>}
            </div>
          </div>
        </div>
      </nav>
      <div className="align-self-center d-flex mt-3 offset-2 col-8 text-centre">
        {" "}

      </div>

      {/* Close Header */}
    </>
  );
}
