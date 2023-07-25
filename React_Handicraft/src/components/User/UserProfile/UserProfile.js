import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './UserProfile.css';
import axios from 'axios';
import api from '../../../WebApi/api';



export default function UserProfile() 
{
  //const [img, setImg] = useState(null)
  const { currentCustomer } = useSelector(state => (state.customer));
  let image = useRef("");

  const handleFileChange = (event) => 
  {
    image = event.target.files[0];

  }

  const handleUpload = async (event) => {
    try {
      event.preventDefault()

      const formData = new FormData();
      formData.append('file', image);
      formData.set("customerId",currentCustomer?._id);
      const response = await axios.post(api.CUSTOMER_SAVE ,formData)
      
    }
    catch (err) {
      console.log(err)
    }

  }

    // return response.data.formData

    return <>
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-120">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: 200 }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                    <img src={"http://localhost:3000/Image/"+currentCustomer.customerImage} alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: 150, zIndex: 1 }} />


                    <button type="button" onClick={handleUpload} className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1 }}>
                      Upload Pic
                    </button>

                  </div>
                  <div className="ms-3" style={{ marginTop: 80 }}>
                    <h5>Name</h5>

                    <h2>{currentCustomer?.customerName}</h2>
                    <input onChange={handleFileChange} type="file" id="img" name="img" />


                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">
                    <div>
                      <p className="mb-1 h5">Email :</p>
                      <p>{currentCustomer?.customerEmail}</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5"> Contact :</p>
                      <p>{currentCustomer?.customerContact}</p>
                    </div>
                    <div>
                      <p className="mb-1 h5"></p>
                      <p className="small text-muted mb-0"></p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </> 
}