import express from "express";
import { SignIn, SingUp, UploadImg, registrationVerifyOtp, verifyOtp } from "../controller/customer.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";
import { body } from "express-validator";
import multer from "multer";


const upload = multer({ dest: "public/Image" });

const router = express.Router();
router.post("/register", body('customerName').notEmpty(), body('customerEmail').isEmail(), SingUp);
router.post("/signin", SignIn);
router.post("/save", upload.single("file"), UploadImg);
router.post("/customerSendOTP", registrationVerifyOtp);
router.post("/verifyOTP", verifyOtp);

export default router;
