import express from "express";
import { orderDetailsByCustomerIdorOrderId, placeOrder, updateOrder, allOrder, orderDetailsBySeller } from "../controller/order.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";
const router = express.Router();


router.post("/buynow", placeOrder)
router.get("/orderdetail", orderDetailsByCustomerIdorOrderId)
router.put("/updateorderstatus/:orderId", updateOrder)
router.get("/allorders", allOrder)
router.get("/getorderbyseller/:id", orderDetailsBySeller);
export default router

