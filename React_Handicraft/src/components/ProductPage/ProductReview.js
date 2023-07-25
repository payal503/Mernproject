import React from "react";
import { Rating } from "react-simple-star-rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Navigation from "../navigation/Navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import api from "../../WebApi/api";
import { useEffect } from "react";

export default function ProductReview() {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState();
  const [product,setProduct]=useState()
  const { currentCustomer } = useSelector((state) => state.customer);
  const location = useLocation();
  const productId = location.state.productId;
  console.log(location.state.productId)
  const handleRatings = (rate) => {
    setRating(rate);
  };
  const handleRating = (event) => {
    const createReview = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/product/addreview/reviews",
          {
            productId: productId,
            customerId: currentCustomer._id,
            rating: rating,
            comment: comment,
          }
        );
        if (response.data.status) {
          toast.info("Product Reviewed Successfully");
        }
        else if (response.status === 200) toast.warning("Product Already Reviewed");
        else if (response.status === 500) toast.error("Server Error !");
      } catch (err) {
        toast.error("Server Error !");
      }
    };
    event.preventDefault();
    createReview();
   
  }
  const productdetail=async()=>{
    try{
     const response=await axios.get(api.VIEW_PRODUCT_BY_ID+`${productId}`)
     console.log(response)
     if(response.data.status){
       setProduct(response.data.product)
     }
   }
   catch{
     toast.error("Something Went Wrong")
   }   
   }
   useEffect(()=>{
    productdetail()
   },[])
  return (
    <>
    <ToastContainer/>
      <Navigation />
      <form onSubmit={handleRating}>
        <div className="container">
          <h1>Create Review</h1>
          <hr />
          <div className="row">
            <div style={{ height: "8rem" }}>
              <main className="container">
                <div className="d-flex align-items-center p-3 my-3 text-dark-50 bg-purple rounded shadow-sm">
                  <img
                    className="mr-3"
                    src={product?.thumbnail}
                    alt
                    width={55}
                    height={55}
                  />
                  <div className="lh-1">
                    <h6 className="mb-1 text-dark lh-2">{product?.title}</h6>
                  </div>
                </div>
              </main>
            </div>
            <hr />
            <div style={{ height: "8rem" }}>
              <h4 className="mt-3">Rating</h4>
              <Rating
                className="mb-2"
                initialValue={rating}
                onClick={handleRatings}
              />
            </div>
            <hr />
            <h4>Add a written review</h4>
            <TextField
              id="comment"
              label="Comment"
              variant="outlined"
              color="primary"
              margin="none"
              sizes="small"
              onChange={(event) => setComment(event.target.value)}
            />
          </div>
          <hr />
          <Button type="submit" variant="outlined" color="warning">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
