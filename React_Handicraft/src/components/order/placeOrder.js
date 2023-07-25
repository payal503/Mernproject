import { useLocation } from "react-router-dom"
import Navigation from "../navigation/Navigation";

export default function PlaceOrder() {
    const location = useLocation();
    console.log(location.state);
    let cart = location.state.cart;
    //let qty = location.state.qty;
    //console.log(qty);
    return <>
        <Navigation />

        <div className="row p-4" style={{ boxShadow: "0 .5rem 1rem rgba(0,0,0,.10) " }}>
            <div className="p-2 m-3"><h2 className="text-center">Place Order</h2></div>
            <div className="col-sm-6 border pt-5" style={{ boxShadow: "0 .5rem 1rem rgba(0,0,0,.5) ", marginLeft: "30px" }}>


                <form action="/order/save" method="post" style={{ fontSize: "100px" }} >

                    <input type="hidden" name="cartItems" id="cart" />
                    <div className="modal-header">
                        <h4 className="modal-title">Enter delivery details</h4>

                    </div>

                    <div className="modal-body">
                        <div className="form-group pt-2 mt-2">
                            <label>Contact person name</label>
                            <input
                                type="text"
                                name="contactPerson"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group form-group pt-2 mt-2">
                            <label>Contact number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group form-group pt-2 mt-2">
                            <label>Delivery address</label>
                            <textarea
                                className="form-control"
                                name="deliveryAddress"
                                defaultValue={""}
                            />
                        </div>
                    </div>

                    <div className="modal-footer form-group pt-2 mt-2">
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="submit" className="btn btn-success form-group pt-2 mt-2">
                            Place order
                        </button>
                    </div>
                </form>

            </div>
            <div className="col-sm-3 pt-5" style={{ boxShadow: "0 .5rem 1rem rgba(0,0,0,.10) ", marginRight: "10px", height: "600px", position: "relative" }} >
                <form action="/order/save" method="post" style={{ fontSize: "100px" }} >

                    <input type="hidden" name="cartItems" id="cart" />
                    <div className="modal-header">
                        <h4 className="modal-title">Order Summary</h4>

                    </div>

                    <div className="modal-body">
                        <div className="form-group pt-2 mt-2">
                            <div>Total Product  :  {cart.length}</div>
                            <div>Bill Amount  :  {}</div>
                        </div>
                        <div className="form-group form-group pt-2 mt-2">
                            <label>Contact number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group form-group pt-2 mt-2">
                            <label>Delivery address</label>
                            <textarea
                                className="form-control"
                                name="deliveryAddress"
                                defaultValue={""}
                            />
                        </div>
                    </div>

                    <div className="modal-footer form-group pt-2 mt-2">
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="submit" className="btn btn-success form-group pt-2 mt-2">
                            Place order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}