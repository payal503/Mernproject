import React from 'react'
import Button from '@mui/material/Button'
import "../payments/success.css"
import { Link } from 'react-router-dom'

export default function SuccessOrder() {
  return <><body id='successbody'>
  <div className="card successorder">
  <div style={{borderRadius: 200, height: 200, width: 200, background: '#F8FAF5', margin: '0 auto'}}>
    <i  id='icon'  className="checkmark">✓</i>
  </div>
  <h1 id="osp"> Order Successfully Placed</h1> 
  <p>We received your purchase request;<br />We sent your order detail on your registered Email Id</p>
  <Button
        variant="contained"
        color="success"
        startIcon={<i class="fa fa-shopping-bag" aria-hidden="true"></i>}
         className='mt-5'
      ><Link to={"/"} id='link'>Continue Shoping</Link>
      </Button>
      <Button
        variant="contained"
        color="warning"
        startIcon={<i class="fas fa-cart-arrow-down    "></i>}
         className='mt-5 ml-5'
      ><Link to={"/orders"} id='link'>Go to orders</Link>
      </Button>
      <div className='mt-5'></div>
</div>

</body>
        </>
        }
        