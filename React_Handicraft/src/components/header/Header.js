import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

export default function Header() {
  const {currentCustomer}=useSelector(state=>state.customer)
  return<>  <nav
    className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block"
    id="templatemo_nav_top"
  >
    <div className="container text-light">
      <div className="w-100 d-flex justify-content-between">
        <div>
          {/* <i className="fa fa-envelope mx-2" /> */}
          {currentCustomer&&<Link
            className="navbar-sm-brand text-light text-decoration-none"
            to="/profile">
            View Profile
            <i className=" mx-2" />
          <a
            className="navbar-sm-brand text-light text-decoration-none"
            href="tel:010-020-0340"
          >
            {currentCustomer.customerName}
            
          </a>
          </Link>
          
          }
          {!currentCustomer&&<p>Please Login First</p>}
        </div>
        <div>
          <a
            className="text-light"
            href="https://fb.com/templatemo"
            target="_blank"
            rel="sponsored"
          >
            <i className="fab fa-facebook-f fa-sm fa-fw me-2" />
          </a>
          <a
            className="text-light"
            href="https://www.instagram.com/"
            target="_blank"
          >
            <i className="fab fa-instagram fa-sm fa-fw me-2" />
          </a>
          <a className="text-light" href="https://twitter.com/" target="_blank">
            <i className="fab fa-twitter fa-sm fa-fw me-2" />
          </a>
          <a
            className="text-light"
            href="https://www.linkedin.com/"
            target="_blank"
          >
            <i className="fab fa-linkedin fa-sm fa-fw" />
          </a>
        </div>
      </div>
    </div>
  </nav>
  <script src="assets/js/jquery-1.11.0.min.js"></script>
    <script src="assets/js/jquery-migrate-1.2.1.min.js"></script>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/templatemo.js"></script>
    <script src="assets/js/custom.js"></script>
</>

    
  }
