import express from "express";
import {customerCount, googleSignIn, orderCount, sellerApproval, sellerCount, sellerDeactive, sellerInActive, signIn, signUp } from "../controller/admin.controlller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/signup",body("name").notEmpty(),
body("email").isEmail(),
body("password").notEmpty(),signUp);
router.post("/signin",signIn);

router.put('/:id',sellerApproval);
router.put('/seller/:id',sellerInActive);
router.get('/customer/count',customerCount);
router.get('/seller/count',sellerCount);
router.get("/order/count",orderCount);
router.get("/seller/deactive",sellerDeactive);
router.post("/google-signin",googleSignIn);


export default router;