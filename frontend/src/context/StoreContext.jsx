import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const navigate = useNavigate();

  const url =import.meta.env.VITE_BACKEND_URL;
  console.log(url);

  const [foodList, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  /* ================= FETCH FOOD LIST ================= */
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      setFoodList(res.data.data || []);
    } catch (error) {
      console.error("Error fetching food list", error);
    }
  };

  /* ================= ADD TO CART ================= */
  const addCart = async (itemId) => {
    itemId = String(itemId);

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(
        `${url}/api/cart/addcart`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  /* ================= REMOVE FROM CART ================= */
  const removeFromCart = async (itemId) => {
    itemId = String(itemId);

    setCartItems((prev) => {
      if (!prev[itemId]) return prev;

      const updated = { ...prev };
      updated[itemId] === 1
        ? delete updated[itemId]
        : (updated[itemId] -= 1);

      return updated;
    });

    if (token) {
      await axios.post(
        `${url}/api/cart/removecart`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  /* ================= LOAD CART FROM DB ================= */
  const loadCartData = async (token) => {
    if (!token) return;

    try {
      const res = await axios.post(
        `${url}/api/cart/getitem`,
        {},
        { headers: { token } }
      );
      setCartItems(res.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart data", error);
    }
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/");
  };

  /* ================= TOTAL CART AMOUNT ================= */
  const getTotalCartAmount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const food = foodList.find(
        (item) => String(item._id) === String(itemId)
      );

      if (food) {
        total += food.price * cartItems[itemId];
      }
    }
    return total;
  };

  /* ================= AUTO LOAD ================= */
  useEffect(() => {
    fetchFoodList();

    if (token) {
      loadCartData(token);
    }
  }, [token]);

  const contextValue = {
    food_list: foodList,
    cartItems,
    addCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
