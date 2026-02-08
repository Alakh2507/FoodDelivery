import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/frontend_assets/assets.js';
import { StoreContext } from '../../context/StoreContext.jsx';
import {useNavigate} from 'react-router-dom'
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addCart, removeFromCart} = useContext(StoreContext);
     const navigate=useNavigate()
  // Always treat id as string (important for MongoDB _id)
  const itemId = String(id);
  const quantity = cartItems[itemId] || 0;

  return (
    <div className="food-item">
      <div  onClick={()=>{navigate("/cart");window.scrollTo(0,0)}} className="food-item-img-container">
        <img src={image} alt={name} />

        {quantity === 0 ? (
          <img
            className="add"
            src={assets.add_icon_white}
            alt="Add to cart"
            onClick={() => addCart(itemId)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="Remove"
              onClick={() => removeFromCart(itemId)}
            />
            <p>{quantity}</p>
            <img
              src={assets.add_icon_green}
              alt="Add"
              onClick={() => addCart(itemId)}
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>

        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
