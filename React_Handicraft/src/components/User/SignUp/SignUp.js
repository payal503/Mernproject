import React, { useState } from 'react'
import "../SignUp/login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom'
import api from '../../../WebApi/api'
import Navigation from '../../navigation/Navigation'
export default function SignUp() {
  const [customerName, setName] = useState("")
  const [customerEmail, setEmail] = useState("")
  const [customerPassword, setPassword] = useState("")
  const [customerContact, setCOntact] = useState("");
  const [customerRegistration, setCustomerRegistration] = useState("");

  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    try {

      event.preventDefault()
      var response = await axios.post(api.USER_SIGNUP, { customerName, customerEmail, customerPassword, customerContact })

      if (response.data.status) {
        toast.success("your are sucessfully sigin up")
        navigate("/signin")
      }
    }
    catch (err) {
      if (response.status.err === 400)
        toast.error("Bad Request!")
      else if (response.status.err === 500)
        toast.error("Server Error !")
      console.log(err)
    }
  }

  return <>
    <Navigation />
    <h2 className="tip">Register yourself</h2>
    <ToastContainer />
    <div className="cont">
      <form onSubmit={handleSubmit}>
        <div className="form sign-up">
          <label className="labellogin">
            <span>Name</span>
            <input type="text" className="logininput" onChange={(event) => setName(event.target.value)} />
            <small id="nameHelpId" class="form-text text-muted"></small>
          </label>
          <label className="labellogin">
            <span>Contact</span>
            <input type="text" className="logininput" onChange={(event) => setCOntact(event.target.value)} />

          </label>+
          <label className="labellogin">
            <span>Email</span>
            <input type="email" className="logininput" onChange={(event) => setEmail(event.target.value)} />
            <small id="emailHelpId" class="form-text text-muted"></small>
          </label>
          <label className="labellogin">
            <span>Password</span>
            <input type="password" className="logininput" onChange={(event) => setPassword(event.target.value)} />
            <small id="passwordHelpId" class="form-text text-muted"></small>
          </label>
          <button type="submit" className="submit loginbtn">Sign Up</button>
          <button type="button" className="fb-btn loginbtn">Join with <span>Google</span></button>
        </div>
      </form>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h2>One of us?</h2>
            <p>Sign In and discover great amount of new opportunities!</p>
          </div>
          <Link to="/signIn">
            <div className="img__btn">
              <span className="m--up">Sign In</span>
            </div>
          </Link>
        </div>
      </div>
    </div>



  </>
}