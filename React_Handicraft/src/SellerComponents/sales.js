import axios from "axios";
import SellerNavigation from "./sellerNevigation";
import SideNav from "./sideNav";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../WebApi/api";
import { useNavigate } from "react-router-dom";

function Sales() {
    const { currentSeller } = useSelector(state => state.seller);
    const [product, setProducts] = useState([]);
    const [separateArray, setSeparateArray] = useState([]);
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();
    let elementCounts = {};



    const buiedProduct = async () => {
        try {
            let response = await axios.get(api.ORDER_BY_SELLER + `/${currentSeller._id}`);
            if (response.data.status)
                setProducts(response.data.sellerOrder);
            // console.log(response.data.sellerOrder);
            console.log(response.data.sellerOrder);

        } catch (err) {
            console.log(err);
        }
    }

    const soldProduct = (item) => {
        console.log(item);
        product.map((items, index) => {
            if (items.productDetails.title == item) {
                navigate(("/sellerProductDescription"), { state: { productDetail: items.productDetails } });
                console.log("payal")
            }
        })
    }
    product.forEach(element => {
        (element.OrderItems?.quantity >= 1) ?


            elementCounts[element.productDetails.title] = (elementCounts[element.productDetails.title] || 0) + 1 * element.OrderItems?.quantity
            : elementCounts[element.productDetails.title] = (elementCounts[element.productDetails.title] || 0) + 1;

    })
    var newArray = Object.entries(elementCounts);
    const addPrice = () => {
        let i = 0;
        newArray.map((arr, index) => {
            arr.push(separateArray[i++]);
            return arr;
        })
    }
    console.log(addPrice());

    useEffect(() => {
        var uniqueIndices = [];
        product.forEach(index => {
            if (!uniqueIndices.includes(index.productDetails.price)) {
                uniqueIndices.push(index.productDetails.price);
            }
        });
        setSeparateArray(uniqueIndices);
    }, [product]);
    console.log(separateArray);


    useEffect(() => {
        buiedProduct();
        setSales(elementCounts);

    }, []);

    return <>
        <SellerNavigation />
        <div className="container-fluid" >
            <div className="row">
                <div className="col-1"><SideNav /></div>
                <div className="col-8 offset-2 mt-5">
                    <div className="text-center mb-4">
                        <h3>Sold Products</h3>
                    </div>
                    <table className="table table-responsive table-hover">
                        <thead className="bg-light me-5 text-center" style={{ boxShadow: "1px 1px 3px gray" }}>
                            <th>S.No</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </thead>
                        <tbody>
                            {newArray.map((item, index) =>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td onClick={(event) => soldProduct(item[0])}><a >{item[0]}</a></td>
                                    <td className="text-center">{item[1]}</td>
                                    <td className="text-center">{item[2] * item[1]}</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}
export default Sales;