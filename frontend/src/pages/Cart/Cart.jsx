import React from 'react'
import './Cart.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'  

const Cart = () => {
  const { cartItems, food_list, removeFromCart , getTotalCartAmount ,url} = useContext(StoreContext);
   const navigate=useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p className='Items'>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quentity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartItems[item._id]){
              return (
                <div className="cart-items-title  cart-items-item" key={index}>
                  <img src={url+"/image/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p> &#8377;{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <p onClick={() => { removeFromCart(item._id) }} className='remove'><X /></p>
                </div>
              )
            }
          })
        }
      </div>

      <div className="cart-bottom">
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
              
              <b>&#8377;{getTotalCartAmount()>2 ? getTotalCartAmount()+2: 0}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed to Checkout</button>
        </div>

        <div className="cart-promocode">
          <div className='cart-promocode1'>
            <p>If you have a promo code,Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart