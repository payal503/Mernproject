import SellerNavigation from "./sellerNevigation";
import Footer from "../components/footer/Footer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SideNav from "./sideNav";
import api from "../WebApi/api";
function Order() {
    const { currentSeller } = useSelector(state => state.seller);
    const [sellerOrder, setOrders] = useState([]);
    const navigate = useNavigate();

    const orderdetails = (totalOrders) => {
        navigate("/orderdetail", { state: { totalOrders: totalOrders } })
    }

    const orderlist = async () => {
        try {
            let response = await axios.get(api.ORDER_BY_SELLER + `/${currentSeller._id}`);
            if (response.data.status)
                setOrders(response.data.sellerOrder);
            console.log(response.data.sellerOrder);

        } catch (err) {
            console.log(err);
        }
    }

    let count = 0;
    let unique = [];
    let uniquecus = [];

    const uniqueorder = sellerOrder.filter((item) => {
        const isDuplicate = unique.includes(item._id);
        if (!isDuplicate) {
            unique.push(item._id);

            return true;
        }
        return false;
    })
    const sortorder = uniqueorder.sort((b, a) => b.date > a.date ? 1 : -1);

    useEffect(() => {
        orderlist();

    }, []);
    return <>
        <SellerNavigation />

        <div id="project" class="project" style={{ marginBottom: "5vh", marginTop: "5vh" }}>

            <div class="container-fluid">
                <div className="row">
                    <div className="col-1 me-2"><SideNav /></div>
                    <div className="col-9 offset-2" style={{ marginLeft: "13vw" }}>
                        <div className="text-center">
                            <h3>OrderList</h3>
                        </div>
                        <table class="table table-hover table-inverse p-5">
                            <thead className="text-center bg-light" style={{ boxShadow: "1px 1px 3px gray" }}>
                                <tr>
                                    <th>S.No</th>
                                    <th>OrderId</th>
                                    <th>Date</th>
                                    <th>Bill Amount</th>

                                    <th>Address</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(sellerOrder)}
                                {sortorder.map((item, index) =>

                                    <tr className="text-center" style={{ boxShadow: "1px 1px 3px gray" }} >
                                        <td>{index + 1}</td>
                                        <td ><button onClick={() => (orderdetails(item))} style={{ border: "none", backgroundColor: "whitesmoke" }}>{item._id}</button></td>
                                        <td>{item.date.substring(0, 10)}</td>
                                        <td>{item.billAmount}</td>
                                        {/* <td>{item.contactPerson}</td> */}
                                        <td>{item.deliveryAddress}</td>
                                        <td>{item.status}</td>
                                    </tr>

                                )}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >

    </>
}
export default Order;