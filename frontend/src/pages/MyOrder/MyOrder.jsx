import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./MyOrder.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        "http://localhost:4000/api/order/userorders",
        {},
        { headers: { token } }
      );

      setOrders(response.data.data ?? []);
    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, index) => {
          const totalItems = order.items?.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return (
            <div key={index} className="order-card">
              <p><strong>Status:</strong> {order.atatus}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Total:</strong> ₹{order.amount}</p>
              <p><strong>Total Items:</strong> {totalItems}</p>

              <h4>Items:</h4>
              {order.items?.map((item, idx) => (
                <div key={idx} className="order-item">
                  <p>{item.name} × {item.quantity}</p>
                </div>
              ))}

              <button
                className="track-btn"
                onClick={() => navigate(`/track/${order._id}`)}
              >
                Track Order
              </button>

              <hr />
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyOrders;
