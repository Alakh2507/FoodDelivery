import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from "axios";
import { assets } from '../../assets/assets';
const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/order/admin");
      setOrders(response.data.data ?? []);
      // setOrders(response.data.orders ? response.data.orders : [])
    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  // Fetch all orders
  const statusUpdate = async (event, id) => {
    const newStatus = event.target.value;

    try {
      const { data } = await axios.post('http://localhost:4000/api/order/status', {
        orderId: id,
        status: newStatus
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };




  useEffect(() => {
    fetchOrders();
  }, []);
  console.log(orders)


  return (
    <div className="admin-orders">
      <h2>Order Page</h2>

      <div className="order-wrapper">
        {orders.map((order, i) => (
          <div key={i} className="order-card">

            {/* Left Side: Order & Items */}
            <div className="order-info">
              <img className="order-img" src={assets.parcel_icon} alt="parcel" />

              <div className="item-list">
                {order.items.map((it, idx) => (
                  <p key={idx}>{it.name} x{it.quantity}</p>
                ))}
              </div>
               
              <div className="order-meta">
                <p>Items: {order.items.length}</p>
                <p>💰 Rs {order.amount}</p>
                <select  onChange={(event) => statusUpdate(event, order._id)} value={order.state} >
                  <option value=""  defaultChecked>{order.atatus}</option>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>

              <button className="btn-processing">Food Processing</button>
            </div>

            {/* Right Side: Customer Info */}
            <div className="customer-info">
              <div className='customer-left '>
                <h4>{order.address.firstName} {order.address.lastName}</h4>
                <p>📧 {order.address.email}</p>
                <p>📍 {order.address.street}, {order.address.city}</p>
              </div>

              <div className='customer-right '>
                <p>{order.address.zipcode}</p>
                <p>{order.address.phone}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>

  )
};

export default Orders;
