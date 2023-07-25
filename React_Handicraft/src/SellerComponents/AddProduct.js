import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerNavigation from "./sellerNevigation";
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import api from "../WebApi/api";
import SideNav from "./sideNav";

function AddProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPercentage, setDiscount] = useState("");
    const [rating, setRating] = useState("");
    const [stock, setStock] = useState("");
    const [categoryId, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const [thumb, setThumb] = useState(null);
    const navigate = useNavigate();
    const { categoryList, error, isLoading } = useSelector((state) => state.category);
    const { currentSeller } = useSelector((state) => state.seller);
    let sellerId = currentSeller._id;

    const handleFileChange = (event) => {
        setFile(Array.from(event.target.files));
    };
    const handleFileChange1 = (event) => {
        setThumb(event.target.files[0])
    }
    console.log(thumb)
    const handleUpload = async (event) => {
        try {
            event.preventDefault()

            const formData = new FormData();
            file.map((f) => {
                formData.append('files', f);
            })
            console.log(formData);
            formData.append('file', thumb);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('discountPercentage', discountPercentage);
            formData.append('rating', rating);
            formData.append('stock', stock);
            formData.append('sellerId', sellerId);
            formData.append('categoryId', categoryId);

            const response = await fetch(api.PRODUCT_ADD, {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                console.log("File uploaded")
                toast.success("new product add successful")
                navigate("/productList")
            }
            else {
                console.error("Error uploading data");
            }
        } catch (err) {
            console.log(err);
        }

    }

    return <>
        <SellerNavigation />
        <div className="container mb-3 mt-5" style={{ marginLeft: "22vw", marginTop: "5px", height: "100vh" }} >
            <div className=" row">
                <div className="col-1 me-2"><SideNav /></div>

                <div className="login-box col-8" style={{ boxShadow: "1px 3px 15px  gray" }}><br />
                    <h2 className="text-center">Add Product</h2><hr />


                    <form className="mt-5 ml-4 mr-4" method="post" >

                        <div className="user-box form-group">

                            <label>Title</label><br />
                            <input type="text" onChange={(event) => setTitle(event.target.value)} className="form-control" /><br />

                        </div>
                        <div className="user-box">

                            <label>Description</label><br />
                            <input type="text" onChange={(event) => setDescription(event.target.value)} className="form-control" /><br />
                        </div>
                        <div className="user-box">

                            <label>Price</label><br />
                            <input type="text" onChange={(event) => setPrice(event.target.value)} className="form-control" /><br />

                        </div>

                        <div className="user-box">

                            <label>Discount</label><br />
                            <input type="text" onChange={(event) => setDiscount(event.target.value)} className="form-control" /><br />

                        </div>
                        <div className="user-box">

                            <label>Rating</label><br />
                            <input type="text" onChange={(event) => setRating(event.target.value)} className="form-control" required="" /><br />
                        </div>
                        <div className="user-box">

                            <label>Stock</label><br />
                            <input type="text" onChange={(event) => setStock(event.target.value)} className="form-control" required="" /><br />
                        </div>
                        <div className="user-box">

                            <label>Category</label><br />
                            <select onChange={(event) => setCategory(event.target.value)} className="form-control" style={{ width: "100%" }}>
                                <option selected>Select menu</option>
                                {categoryList.map((category, index) => <option value={category._id}>{category.categoryName}</option>
                                )}
                            </select><br />
                        </div>
                        <div className="user-box">

                            <label>Thumbnail</label><br />
                            <input type="file" name='thum' onChange={handleFileChange1} />
                        </div><br />
                        <div className="user-box">

                            <label>Images</label><br />
                            <input type="file" name='image' onChange={handleFileChange} multiple />
                        </div>
                        <div className="mb-5">
                            <button className="btn btn-primary mt-3" onClick={handleUpload}>Upload File</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >


    </>
}
export default AddProduct;