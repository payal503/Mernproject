
import { Link, useNavigate } from "react-router-dom";
import SellerNavigation from "./sellerNevigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSeller } from "../redux-config/sellerSignInSlice";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import SideNav from "./sideNav";
import api from "../WebApi/api";

import { useGoogleLogin } from "@react-oauth/google";

function SellerSignIn() {

    const [sellerEmail, setEmail] = useState("");
    const [sellerPassword, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signin = async (event) => {
        try {
            event.preventDefault();
            let response = await axios.post(api.SELLER_SIGNIN, { sellerEmail, sellerPassword });
            dispatch(setSeller(response.data.seller));
            toast.success("SingIn Successful..");
            navigate("/sellerHome");
        } catch (err) {
            toast.error("Oops! something went wrong");
        }
    }

    // ------------------------------------------------------------------------------
    // Email Validation:-

    function emailValidation() {
        var status = true;
        var email = document.getElementById("email").value;
        var emailside = document.getElementById("emailside");
        email = email.trim();
        if (email.length == 0) {
            status = false;
            emailside.innerHTML = "email is required";

        }
        else {
            var atTheRateIndex = email.indexOf('@');
            var secondAtTheReateIndex = email.lastIndexOf('@');
            var dotIndex = email.indexOf('.');
            if (atTheRateIndex == -1) {
                status = false;
                emailside.innerHTML = "Invalid email(@ missing)";

            }
            else if (secondAtTheReateIndex != atTheRateIndex) {
                status = false;
                emailside.innerHTML = "Invalid email";

            }
            else if (dotIndex == -1) {
                status = false;
                emailside.innerHTML = "Invalid email(. missing)";

            }
            else {
                var stringAfterAtTheRate = email.substring(atTheRateIndex);
                var lastDotIndex = stringAfterAtTheRate.indexOf(".");
                if (lastDotIndex == -1) {
                    status = false;
                    emailside.innerHTML = "Invalid email(. missing in domain)";

                }
                else {
                    var inOrCom = stringAfterAtTheRate.substring(lastDotIndex + 1);
                    if (inOrCom.length < 2) {
                        status = false;
                        emailside.innerHTML = "Invalid email";

                    }
                    else {

                        if (stringAfterAtTheRate.substring(1, lastDotIndex).length == 0) {
                            status = false;
                            emailside.innerHTML = "Invalid Email";

                        }
                        else
                            emailside.innerHTML = "";
                    }
                }
            }
        }
        return status;
    }
    // ------------------------------------------------------------------------------------
    //Password Validation:---

    function pswdValidation() {
        var status = true;
        var password = document.getElementById("pid").value;
        var pswdside = document.getElementById("pswdside");
        if (password.length == 0) {
            status = false;
            pswdside.innerHTML = "password is required";

        }
        else if (password.length < 6) {
            status = false;
            pswdside.innerHTML = "password must be at least 6 letter.";

        }

        else
            pswdside.innerHTML = "";
        return status;
    }
    // ------------------------------------------------------------------------------------
    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                let data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { "Authorization": `Bearer ${tokenResponse.access_token}` } })
                // dispatch(fetchAdmin(data.data.email));
                toast.success("Sign In Success");
                navigate("/sellerHome");
            } catch (err) {
                if (err.request.status == 400) {
                    window.alert("User not found , SignUp First");
                }
                else
                    window.alert("Something went wrong . . .");
            }
        }
    });

    return <><SellerNavigation />
        <div className="container mt-5 mb-5" style={{ marginLeft: "17vw", }}>
            <div className=" row">
                <div className="col-1 me-2"><SideNav /></div>
                <div className="col-9 d-flex" style={{ marginLeft: "7vw" }}>
                    <div className=" col-sm-12 col-lg-5 col-md-12 bg-primary p-0" >
                        <img className="img-fluid img-responsive w-100" src="assets/img/potter1.jpg" style={{ height: "69vh" }} />
                    </div>
                    <div className="login-boxcol-sm-12 col-lg-6 col-md-12 " style={{ boxShadow: "3px 5px 25px gray" }}><br />
                        <h2 className="text-center" >Login</h2><hr /><br />
                        <form method="post" action="/signin" onSubmit={signin}>

                            <div className="user-box ml-4 mr-4 ">


                                <input
                                    type="email" onKeyUp={emailValidation}
                                    className="form-control" name="email" id="email" placeholder="Enter Email"
                                    onChange={(event) => setEmail(event.target.value)}
                                /> <small id="emailside" style={{ color: "red", marginLeft: "12px", marginBottom: "2px" }}>*</small>

                            </div>
                            <div className="user-box ml-4 mr-4">
                                <input
                                    type="password"
                                    className="form-control" onKeyUp={pswdValidation} id="pid" name="password"
                                    onChange={(event) => setPassword(event.target.value)} placeholder="Enter password"
                                /><small id="pswdside" style={{ color: "red", marginLeft: "12px", marginBottom: "2px" }}>*</small>
                            </div>
                            <button type="submit" className="btn btn-dark mt-4 ml-4 mr-4" style={{ borderRadius: "5%", width: "88%" }}>
                                SignIn
                            </button>
                            <div className="mt-3 text-right mb-4 mr-4">
                                <Link to="/sellersignUp">New User ?</Link>
                            </div>

                        </form>
                    </div>
                </div >
            </div>
        </div >
    </>
}

export default SellerSignIn;