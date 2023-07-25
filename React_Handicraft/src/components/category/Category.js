import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function Category() {
const navigate=useNavigate()
    const{categoryList,error,isLoading}=useSelector((state)=>state.category)
    if(error)
    return<h1>error</h1>
  const productByHomeCategory=(category)=>{
     navigate("/products",{state:{category:category}})
  }


  return <>
  {/* Start Categories of The Month */}
  <section className="container py-5">
    <div className="row text-center pt-3">
      <div className="col-lg-6 m-auto">
        <h1 className="h1">Categories</h1>
      </div>
    </div>
    <div className="row">

        {categoryList.map((category,index)=>
        
      <div className="container col-12 col-md-2">
        <a onClick={()=>productByHomeCategory(category)}>
          <img
            src={`./assets/img/category(${index+1}).jpg`}
            className=" img-fluid border"
         style={{borderRadius:"50%" ,width:"10vw",height:"10vw"}} />
        </a>
        <h5 className="text-center mr-5 mt-3 mb-3">{category.categoryName}</h5>
      </div>
      )}
    </div>
  </section>
  {/* End Categories of The Month */}
</>

}
