import Twilio from "twilio";
import dbConfig from "../db/dbConfig.js";
import { Customer } from "../model/customer.model.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const SignIn = async (request, response, next) => {
    try {
        let responseType = false;
        let customer = await Customer.findOne({ customerEmail: request.body.customerEmail });

        responseType = customer ? true : false;

        let status = responseType ? await bcrypt.compare(request.body.customerPassword, customer.customerPassword) : false;
        // console.log(status);
        if (status) {
            let payload = { subject: Customer.customerEmail }
            let token = Jwt.sign(payload, 'fdgljfiofojffjdfjdfkjof')
            customer = customer?.toObject();//make an object
            delete customer?.customerPassword;
            return status ? response.status(200).json({ message: "SignIn Successful", token: token, status: true, customer: { ...customer, customerPassword: undefined } }) : response.status(400).json({ error: "Bad request", status: false });

        }
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server error", status: false });
    }
}

export const SingUp = async (request, response, next) => {
    console.log(" sign up called");
    try {
        console.log("called");
        let saltkey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(request.body.customerPassword, saltkey);
        request.body.customerPassword = encryptedPassword;

        let customer = await Customer.create(request.body)
        return response.status(200).json({ message: "SignUp Successful", customer: customer, status: true });

    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const UploadImg = async (request, response, next) => {
    try {
        let image = request.file?.filename;
        console.log(image);
        let data = await Customer.findOneAndUpdate({ _id: request.body.customerId }, { customerImage: image });
        return response.status(200).json({ Message: "Image upadated successfully", status: true })

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });

    }
}

export const registrationVerifyOtp = async (request, response, next) => {
    try {
        let customer = await Customer.findOne({ customerContact: request.body.customerContact })
        console.log(customer);
        if (!customer) {
            let tempraryPassword = Math.floor(100000 + Math.random() * 900000);
            var to = "+91" + request.body.customerContact;
            console.log(to);
            const accountSid = 'AC78ff3ba4da5f6c6c346b2b40a041904e';
            const authToken = '56b0868d59eaf1a0b67e96b4881e318e';
            const client = Twilio(accountSid, authToken);

            const message = await client.messages.create({
                body: `Your OTP is: ${tempraryPassword}`,
                from: '+13203738823',
                to
            });

            console.log('OTP sent:', message.sid);
            return response.status(200).json({ otp: tempraryPassword, status: true });
        }
        else {
            console.log("inner elese")
            return response.status(450).json({ err: "contact already register please log in", status: false })
        }
    }
    catch (error) {
        console.error('Error sending OTP:', error);
        response.status(550).json({ error: 'Failed to send OTP' });
    }
}

export const verifyOtp = async (request, response, next) => {
    try {
        let customer = await Customer.findOne({ contact: request.body.contact });
        console.log(customer);
        if (customer) {
            console.log("object ka temprary" + customer.tempraryPassword);
            console.log("body ka temprary" + request.body.tempraryPassword);
            if (customer.tempraryPassword == request.body.tempraryPassword) {
                return response.status(200).json({ result: "Verify successfully", status: true });
            }
            else
                return response.status(401).json({ message: "your temprary password not match", status: false });
        }
        else
            return response.status(401).json({ message: "bad request", status: false });
    }
    catch (err) {
        console.log(err);
        response.status(500).json({ err: "internal server error", status: false });
    }
}

