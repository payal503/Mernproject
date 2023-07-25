import api from "../../../WebApi/api";

function verifyUser() {
  // --------------------------------------- verify pass---------------------
    // --------------------------------------- verify pass---------------------
    // const navigate = useNavigate();
    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");
    const [pin5, setPin5] = useState("");
    const [pin6, setPin6] = useState("");
    const [pinErr, setPinErr] = useState(false);
    const { currentCustomer } = useSelector(state => state.customer);
    const { currentShopkeeper } = useSelector(state => state.shopkeeper);
    const verifyHandleSubmit = async (event) => {
        try {

            let tempraryPassword = pin1 + "" + pin2 + "" + pin3 + "" + pin4 + "" + pin5 + "" + pin6;
            event.preventDefault();



            if (currentCustomer) {
                let contact = currentCustomer.contact;
                const response = await axios.post(api.CUSTOMER_VERIFY_OTP, { contact, tempraryPassword });
                setSetPasswordFlag(true);
                setVerifyPasswordFlag(false);
                funTurn();
            }
            else if (currentShopkeeper) {
                let contact = currentShopkeeper.contact;
                const response = await axios.post(api.SHOPKEEPER_VERIFY_OTP, { contact, tempraryPassword });
                navigate("/setPassword")
            }
            else{
                if(varifyOtp==tempraryPassword){
                    const response=await axios.post(api.CUSTOMER_SIGNUP,customerRegistration);
                    console.log(response);
                    window.alert("sign up ki api chli ")
                    toast.success("Registration Successs");
                    setVerifyPasswordFlag(false);
                    funReturn();
                

                }
                else{
                    toast.error("Otp not Match")
                }
                
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Oops! wrong otp");
        }
    }  
  return <>
   {verifyPasswordFlag && <>
                                <div className="col-md-4 col-sm-12 " id="firstside">
                                    <div style={{ marginTop: "2vw" }}>
                                        <div className="container-fluid fw-bold text-center " id="h2">
                                            Verify Otp
                                        </div>
                                    </div>
                                    <div className="imgDiv">
                                        <img
                                            style={{ height: "100px" }}
                                            src="./images/LoginImage.svg"
                                            className="sideImg"
                                            alt="Responsive image"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-12 secondside">
                                    <div className="close">
                                        <button type="button" id="closebutoon" onClick={modalClose} class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>

                                    </div>

                                    <form onSubmit={verifyHandleSubmit}>
                                        <div className="form-group" style={{ marginTop: "3vw" }}>
                                            <div style={{ marginLeft: "3vw", textAlign: "center" }}>
                                                <div >
                                                    <label className="form-label label">Enter verification code</label>
                                                </div>
                                                <div style={{ fontSize: 16, marginTop: 15 }}>
                                                    <div class="input-field">
                                                        <input className='input' onChange={(event) => setPin1(event.target.value)} type="text" maxLength={1} />
                                                        <input className='input' onChange={(event) => setPin2(event.target.value)} type="text" maxLength={1} />
                                                        <input className='input' onChange={(event) => setPin3(event.target.value)} type="text" maxLength={1} />
                                                        <input className='input' onChange={(event) => setPin4(event.target.value)} type="text" maxLength={1} />
                                                        <input className='input' onChange={(event) => setPin5(event.target.value)} type="text" maxLength={1} />
                                                        <input className='input' onChange={(event) => setPin6(event.target.value)} type="text" maxLength={1} />

                                                    </div>
                                                    <div>
                                                        <div style={{ height: "1vw" }}>
                                                            {pinErr ? <small style={{ color: "red", textAlign: "left" }} >Invalid Otp</small> : ""}
                                                        </div>
                                                    </div>

                                                </div>
                                                <Link to="/forgotPassword" id='signin'><i class="fa fa-arrow-left icon" aria-hidden="true"></i>Back</Link>
                                                <div id='buttonDiv' style={{ marginTop: "10vw" }} >
                                                    <button type="submit" className="btn" id="signinBtn" >
                                                        VERIFY
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </>}
  
  </>


}

export default verifyUser;