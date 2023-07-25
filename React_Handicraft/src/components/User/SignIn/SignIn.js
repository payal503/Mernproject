import { Link } from "react-router-dom"
import "../SignUp/login.css"
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { fetchUser, setCustomer } from "../../../redux-config/CustomerSlice";
import 'react-toastify/dist/ReactToastify.css'
import api from "../../../WebApi/api";
import Navigation from "../../navigation/Navigation";
import { useGoogleLogin } from "@react-oauth/google";
import "../SignIn/signin.css";


export default function SignIn() {
  const [customerEmail, setEmail] = useState("")
  const [customerPassword, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const response = await axios.post(api.USER_SIGNIN, { customerEmail, customerPassword })
      dispatch(setCustomer(response.data.customer))
      if (response.data.status) {
        navigate("/")
        toast.success("Sign in sucessful")
      } else {
        toast.error("Invalid email,password")
      }
    } catch (err) {
      toast.error("Something went Wrong")
      console.log(err)
    }
  }
  // ---------------------------------------------------------------------------------------------------
  // email
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
  // ---------------------------------------------------------------------------------------------
  // password


  function pswdValidation() {
    var status = true;
    var password = document.getElementById("pid").value;
    var pswdside = document.getElementById("pswdside");
    if (password.length == 0) {
      status = false;
      pswdside.innerHTML = "password is required";

    }
    else if (password.length < 8) {
      status = false;
      pswdside.innerHTML = "password must be at least 8 letter.";

    }

    else
      pswdside.innerHTML = "";
    return status;
  }

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        let data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { "Authorization": `Bearer ${tokenResponse.access_token}` } })
        dispatch(fetchUser(data.data.email));
        toast.success("Sign In Success");
        navigate("/");
      } catch (err) {
        if (err.request.status == 400) {
          window.alert("User not found , SignUp First");
        }
        else
          window.alert("Something went wrong . . .");
      }
    }
  });


  return <>
    <ToastContainer />
    <Navigation />
    <h2 className="tip">Login</h2>
    <div className="cont">
      <div className="form sign-in">
        <form onSubmit={handleSubmit}>
          <h2>Welcome back,</h2>
          <label className="labellogin">
            <span>Email</span>
            <input type="email" id="email" name="email" onKeyUp={emailValidation} className="form-control logininput" onChange={(event) => setEmail(event.target.value)} /><small id="emailside" style={{ color: "red", marginLeft: "12px", marginBottom: "2px" }}>*</small>
          </label>
          <label className="labellogin">
            <span>Password</span>
            <input type="password" onKeyUp={pswdValidation} id="pid" name="password" className="form-control logininput" onChange={(event) => setPassword(event.target.value)} /><small id="pswdside" style={{ color: "red", marginLeft: "12px", marginBottom: "2px" }}>*</small>
          </label>
          <p className="forgot-pass">Forgot password?</p>
          <button type="submit" className="submit loginbtn">Sign In</button>
          <button id="google-login-btn" className='btn-block mb-4' onClick={login}>
            Continue with Google
          </button>
        </form>
      </div>

      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h2>New here?</h2>
            <p>Sign up and discover great amount of new opportunities!</p>
          </div>
          <Link to={'/signUp'}>
            <div className="img__btn">
              <span className="m--up">Sign Up</span>

            </div>
          </Link>
        </div>
      </div>

    </div>
  </>
}