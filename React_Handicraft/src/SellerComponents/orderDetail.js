import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SellerNavigation from "./sellerNevigation";
import SideNav from "./sideNav";

function OrderDetail() {
    const [detail, setDetail] = useState([])
    const location = useLocation([]);
    const { totalOrders } = location.state;
    // console.log(totalOrders);


    useEffect(() => {
        setDetail(totalOrders);
    });

    return <>
        <div className="container-fluid">

            <div className="row">
                <div className="col-1"><SideNav /></div>
                <div
                    style={{
                        textAlign: "center",
                        boxShadow: "2px 2px 10px",
                        width: "60%",
                        marginLeft: "20vw",
                        marginBottom: "3vh"
                    }}
                >
                    <h1>Order-History</h1>
                </div>
                <div className="col-md-8" style={{ marginLeft: "25vw" }}>

                    < div className="card card-2 mt-3">
                        <div className="card-body">
                            <div className="media d-flex">
                                <div className="sq align-self-center ">

                                    <img className="img-fluid  my-auto align-self-center mr-2 mr-md-4 " src={detail.productDetails?.thumbnail} style={{ height: "15vh", width: "12vw" }} />
                                </div>
                                <div className="media-body my-auto text-right">
                                    <div className="row  my-auto flex-column flex-md-row ">
                                        <div className="col" style={{ textAlign: "center" }}><small>
                                            {detail.productDetails?.title}
                                        </small>
                                        </div>
                                        <div className="col-md-2">Qty : {detail.OrderItems?.quantity}</div>
                                        <div className="col my-auto">
                                            <h6 className="mb-0">
                                                Total BillAmount : {detail.productDetails?.price}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-3 " />
                            <div className="row">

                                <div className="col-auto my-auto">

                                </div>
                                <div className="col mt-auto offset-2" style={{ marginLeft: "35vw" }}>
                                    <div>Order Placed Date : {detail.OrderItems?.date}</div>
                                    <div>OrderID : {detail.OrderItems?._id} </div>

                                </div>
                                <div>
                                    <div>Address : {detail?.deliveryAddress} </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    </>
}
export default OrderDetail;