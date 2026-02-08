import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext.jsx'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const PlaceOrder = () => {

  const { getTotalCartAmount, token, cartItems, food_list, url } = useContext(StoreContext)
     
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onchangeHandler = (event) => {
    setData(data => ({
      ...data,
      [event.target.name]: event.target.value
    }))
  }

  // FORM SUBMIT HANDLER
  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems=[]
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
         let itemInfo=item;
         itemInfo["quantity"]=cartItems[item._id];
         orderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }   

    let response=await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})

     if(response.data.success){
      const {session_url}=response.data;
     
      window.location.replace(session_url)
     }else{
      toast.error("Error");
     }
  }

  const navigate=useNavigate();

  useEffect(()=>{
    if(!token){
       navigate('/cart');
    }else if(getTotalCartAmount()===0){
        navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Deliver Information</p>
        <div className='multi-fields'>
          <input onChange={onchangeHandler} name="firstName" value={data.firstName} type="text" placeholder='First name' required />
          <input onChange={onchangeHandler} name="lastName" value={data.lastName} type="text" placeholder='Last name' required />
        </div>

        <input onChange={onchangeHandler} name="email" value={data.email} type="email" placeholder='Email address' required />
        <input onChange={onchangeHandler} name="street" value={data.street} type="text" placeholder='Street' required />

        <div className='multi-fields'>
          <input onChange={onchangeHandler} name="city" value={data.city} type="text" placeholder='City' required />
          <input onChange={onchangeHandler} name="state" value={data.state} type="text" placeholder='State' required />
        </div>

        <div className='multi-fields'>
          <input onChange={onchangeHandler} name="zipcode" value={data.zipcode} type="number" placeholder='Zip code' required />
          <input onChange={onchangeHandler} name="country" value={data.country} type="text" placeholder='Country' required />
        </div>

        <input onChange={onchangeHandler} name="phone" value={data.phone} type="text" placeholder='Phone' required />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className='cart-total-contenar'>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>&#8377;{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>&#8377;{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total:</b>
              <b>&#8377;{getTotalCartAmount() > 2 ? getTotalCartAmount() + 2 : 0}</b>
            </div>
          </div>
          <button type='submit' className='payment-btn'>
            Proceed to payment
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
