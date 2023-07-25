import { useSelector } from "react-redux";
import SellerNavigation from "./sellerNevigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SideNav from "./sideNav";
import api from "../WebApi/api";


function UpdateProduct() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [discountPercentage, setDiscount] = useState("");
    const location = useLocation();

    const productdetail = location.state.productdetail



    const update = async (event) => {
        try {
            event.preventDefault(location.state._id);
            let response = await axios.post(api.UPDATE_PRODUCT + `/${productdetail._id}`, { title, description, price, stock, discountPercentage });
            toast.info("Product update successfully");
        } catch (err) {
            console.log(err);
        }
    }
    return <>

        <ToastContainer />
        <SellerNavigation />
        <div className="container mb-3 mt-3" style={{ marginLeft: "22vw", marginTop: "5px" }} >
            <div className=" row">

                <div className="col-1 me-2"><SideNav /></div>
                <div className="login-box col-lg-8" style={{ boxShadow: "1px 3px 15px  gray" }}><br />
                    <h2 className="text-center">Product Detail Update</h2>
                    <p className="text-center">Fill the field you want to update</p><hr />
                    <form className="mt-5">
                        <div className="user-box form-group">

                            <label>Title</label><br />
                            <input onChange={(event) => setTitle(event.target.value)} type="text" placeholder={productdetail.title} className="form-control" /><br />

                        </div>
                        <div className="user-box">

                            <label>Description</label><br />
                            <input onChange={(event) => setDescription(event.target.value)} type="text" placeholder={productdetail.description} className="form-control" /><br />

                        </div>
                        <div className="user-box">

                            <label>Price</label><br />
                            <input onChange={(event) => setPrice(event.target.value)} type="text" placeholder={productdetail.price} className="form-control" /><br />

                        </div>
                        <div className="user-box">

                            <label>Stock</label><br />
                            <input type="text" className="form-control" placeholder={productdetail.stock} onChange={(event) => setStock(event.target.value)} name="contact" required="" /><br />
                        </div>

                        <div className="user-box">

                            <label>Discount</label><br />
                            <input onChange={(event) => setDiscount(event.target.value)} type="text" placeholder={productdetail.discountPercentage} className="form-control" /><br />

                        </div>
                        <button type="submit" className="btn btn-dark mt-2 mb-5" onClick={update} style={{ borderRadius: "5%" }}>
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div >


    </>
}

export default UpdateProduct;