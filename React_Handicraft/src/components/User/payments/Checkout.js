import React, { useEffect } from 'react'
import Navigation from '../../navigation/Navigation'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDeliveryDetail } from '../../../redux-config/DeliveryDetailSlice'
import "../payments/payments.css"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import ValidateForm from "form-validation-react";

export default function Checkout() {
  const [payment, setPayment] = useState("");
  const { currentCustomer } = useSelector(state => state.customer)
  const data = useSelector(state => state.deliveryDetail)
  const location = useLocation()
  const navigate=useNavigate()

  const totalBill = location.state.orderpackage.billamount + location.state.orderpackage.SHIPPING_FEES
  const products = location.state.orderpackage.cartitems
  const dispatch = useDispatch()
  const [name, setName] = useState()
  const [deliveryaddress, setdeliveryAddress] = useState()
  const [contactPerson, setContactPerson] = useState()
  const [contactNumber, setContactNumber] = useState()
  

  // --------------------------------------------------------
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  // --------------------------------------------------------


 

  const personDetail = async (event) => {
    event.preventDefault()
    window.alert(payment)
    if (payment == 'rozarpay') {
      displayRazorpay()
    }
    else {
      const data = { name, deliveryaddress, contactPerson, contactNumber }
      dispatch(setDeliveryDetail(data))
      const response = await axios.post("http://localhost:3000/order/buynow", {
        "customerid": currentCustomer._id,
        "deliveryAddress": deliveryaddress,
        "contactNumber": contactNumber,
        "contactPerson": contactPerson,
        "orderItems": products
        
      }
      )
      console.log(response)
      toast.success("Order Placed Successfully")
      navigate("/ordersuccess")
    }

    // --------------------------------------------------------
  }
  const displayRazorpay = async () => {
    let response = await axios.post("http://localhost:3000/api/razorpay", { totalBill })

    let data = response.data
    const options = {
      key: "rzp_test_Vhg1kq9b86udsY",
      currency: data.currency,
      amount: data.amount,
      name: "Learning To Code Online",
      description: "Test Wallet Transaction",
      image: "https://tse2.mm.bing.net/th?id=OIP.4p7ztcUW4gAM6_1VGZ1EVwHaIj&pid=Api&P=0",
      order_id: data.id,
      handler: async (response) => {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        toast.success("Order Success")
        const data = { name, deliveryaddress, contactPerson, contactNumber }
        dispatch(setDeliveryDetail(data))
        const res = await axios.post("http://localhost:3000/order/buynow", {
          "customerid": currentCustomer._id,
          "deliveryAddress": deliveryaddress,
          "contactNumber": contactNumber,
          "contactPerson": contactPerson,
          "orderItems": products
        }
        )
        console.log(res)
      },
      prefill: {
        name: "vikram",
        email: "vikrampratapsingh628@gmail.com",
        contact: "9131662204",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (<>
    <Navigation />
    <ToastContainer />

    <Link to={"/cart"}> <button type="button" className="btn btn-primary mb-4 ml-2">Back To  Cart</button></Link>
    <div className='container'>
      <form onSubmit={personDetail}>
        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0 fw-100">Biling details</h5>
              </div>
              <div className="card-body">

                {/* 2 column grid layout with text inputs for the first and last names */}
                <div className="row mb-4">
                  <div className="col">
                    <div className="form-outline">
                      <input type="text" onChange={(e) => setName(e.target.value)} id="form7Example1" className="form-control" />
                      <label className="form-label" htmlFor="form7Example1">Name</label>
                    </div>
                  </div>
                </div>
                {/* Text input */}
                <div className="form-outline mb-4">
                  <input type="text" id="form7Example3" onChange={(e) => setdeliveryAddress(e.target.value)} className="form-control" />
                  <label className="form-label" htmlFor="form7Example3">Delivery Address</label>
                </div>
                {/* Text input */}
                <div className="form-outline mb-4">
                  <input type="text" id="form7Example4" onChange={(e) => setContactPerson(e.target.value)} className="form-control" />
                  <label className="form-label" htmlFor="form7Example4">Contact Person Name</label>
                </div>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input type="text" onChange={(e) => setContactNumber(e.target.value)} id="form7Example5" className="form-control" />
                  <label className="form-label" htmlFor="form7Example5">Contact Number</label>
                </div>


              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    <strong> Products</strong>
                  </li>
                  {products.length>1&&products.map((product) => (<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    {product.productId.title.substring(0, 40)}
                    <br />
                    <span>Qty {product.quantity}</span>
                  </li>))}
                  {products.length==1&&products.map((product) => (<li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    {product.productId.title.substring(0, 40)}
                    <br />
                    <span>Qty 1</span>
                  </li>))}
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including Shiping)</p>
                      </strong>
                    </div>
                    <span><strong>&#8377;{totalBill}</strong></span>
                  </li>
                  <div>
                    <strong>Make Payemnt</strong>
                    <div class="mb-3">
                      <label for="" class="form-label"></label>
                      <select onChange={(event) => setPayment(event.target.value)} class="form-select form-select-lg" name="" id="">
                        <option value="default" selected>Select Payment Mode</option>
                        <option value="rozarpay">RazorPay</option>
                        <option value="debit">Debit Card</option>
                        <option value="credit">Credit Card</option>
                      </select>
                    </div>
                  </div>
                </ul>

                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  Make purchase
                </button>
              </div>
            </div>
          </div>
        </div>

      </form>
      <div>
        
      
        {/* Button trigger modal */}
        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Order Sucessully</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <div className="text-right"> <i className="fa fa-close close" data-dismiss="modal" /> </div>
                  <div className="px-4 py-5">
                    <h5 className="text-uppercase">{currentCustomer.customerName}</h5>
                    <h4 className="mt-5 theme-color mb-5">Thanks for your order</h4>
                    <span className="theme-color">Payment Summary</span>
                    <div className="mb-3">
                      <hr className="new1" />
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="font-weight-bold">Total Product Price</span>
                      <span className="text-muted">&#8377;{location.state.orderpackage.billamount}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <small>Shipping</small>
                      <small>&#8377;{location.state.orderpackage.SHIPPING_FEES}</small>
                    </div>
                    {/* <div className="d-flex justify-content-between">
      <small>Tax</small>
      <small>$200.00</small>
    </div> */}
                    <div className="d-flex justify-content-between mt-3">
                      <span className="font-weight-bold">Total</span>
                      <span className="font-weight-bold theme-color">&#8377;{totalBill}</span>
                    </div>
                    <div className="text-center mt-5">
                      <button className="btn btn-primary" data-dismiss="modal">Track your order</button>
                    </div>
                  </div>
                </div>


              </div>
              <div className="modal-footer">
                <Link to={"/home"}><button type="button" className="btn btn-primary"> Go to Home Page</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </>
  )
}
