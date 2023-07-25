import { useLocation } from "react-router-dom"
import Navigation from "../navigation/Navigation";

export default function OrderDetail(){
    const locat = useLocation();
    const data = locat.state.order;
    const orderItem = data.orderItem;
    console.log(orderItem);

    return<>
    <Navigation/>
        <h1 className="text-center">OrderDetail</h1>
        <div className="container">
        <div className="row pt-2">
            <div className="col-md-6">
                <div className="row">
                <div className="col-md-5">
                    Customer Id :
                </div>
                <div className="col-md-6">
                   {data.customerid}
                </div>
                </div>
                <div className="row">
                <div className="col-md-5">
                    Order Id : 
                </div>
                <div className="col-md-6">
                    {data._id} 
                </div>
                </div>
            </div>
            <div className="col-md-4 offset-1">
            <div className="row">
                <div className="col-md-5">
                    Date : 
                </div>
                <div className="col-md-6">
                   {data.date.toString()}
                </div>
                </div>
                <div className="row">
                <div className="col-md-5">
                    Status : 
                </div>
                <div className="col-md-6">
                    {data.status} 
                </div>
                </div> 
            </div>
        </div>
        </div>
        <hr style={{borderTop: "5px dotted green", marginTop : "50px"}}/>
        <div className="container" style={{boxShadow : "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; "}}>
        <div className="row">
            
            {orderItem.map((productdata,index)=><>
            
            <div className="col-md-4">
              <img src={productdata.product.thumbnail} style={{height : "250px", width : "200px"}}/>
            </div>
            <div className="col-md-4 pt-3">
               <div><h5>{productdata.product.title}</h5></div>
               <div>price : { productdata.product.price}</div>
               <div>Quantity : {productdata.quantity}</div><br/>
               <div>description : {productdata.product.description.substring(0,50)}</div>
            </div>
            <div className="col-md-4 mt-5 text-center">
                <div>
                    <button className="btn btn-success" style={{marginLeft :"20px",marginTop : "50px"}}>Re-Order</button>
                </div>
            </div>
            
            </>
           
            )}
        </div>
        <div className="container text-right m-3">
            totalPrice :
        </div>
        </div>
    </>
}