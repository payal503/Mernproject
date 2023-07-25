import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../redux-config/sellerSignInSlice";



export default function SellerNavigation() {

    const { currentSeller } = useSelector(state => state.seller);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sellerSignOut = () => {
        dispatch(signOut());
        navigate("/sellersignin")
    }

    const signout = () => {
        currentSeller = null;
    }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light shadow" style={{ width: "80vw", marginLeft: "20vw" }}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <a
                    className="navbar-brand text-success logo h2 align-self-center"
                    href="index.html"
                >
                    <img
                        src="./assets/img/logo1.png"
                        style={{ width: "190px", height: "90px" }}
                        className=""
                        alt=""
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {currentSeller &&
                        <div>
                            <p><i class="fa fa-user-circle" aria-hidden="true" >{currentSeller.sellerEmail}</i></p>

                        </div>}
                </div>
            </div>

        </nav >
        </>
    );
}
