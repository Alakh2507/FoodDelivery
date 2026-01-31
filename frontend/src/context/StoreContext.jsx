
import { createContext, useEffect } from 'react'
// import { foood_list } from '../assets/frontend_assets/assets.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
export const StoreContext = createContext(null);

const StorContextProvider = (props) => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token, setToken] = useState("");
    const [foodlist, setFoodList] = useState("");



    const fetchfoodlist = async () => {
        const response = await axios.get(`${url}/api/food/list`,
        )

        setFoodList(response.data.data)
    }

    // add addCart
    const addCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))

        }
        // add data to db
        if (token) {
            const response = await axios.post(`${url}/api/cart/addcart`, { itemId },
                {
                    headers: { token }
                }
            )
            console.log(response.data.message)
        }
    }
    // remove form cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        //remove data from db
        await axios.post(`${url}/api/cart/removecart`, { itemId },
            {
                headers: {
                    token
                }
            }
        )
    }
    //cartdata
    const loadCartData = async (token) => {

        const response = await axios.post(`${url}/api/cart/getitem`, {},
            { headers: { token } }
        );
        setCartItems(response.data.cartData);
    };


    // Logout
    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        alert("Logout");
        navigate("/");
    };
    //automatic log in 
    useEffect(() => {
        async function loadData() {
            await fetchfoodlist();
            const token = localStorage.getItem("token");
            if (token) {
                setToken(token);
            }
            await loadCartData(token);
        }
        loadData();

    }, []);


    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    }
     
    // useEffect(() => {
    //  console.log(cartItems);
    // }, [cartItems])
    //    console.log(foodlist)
    const food_list = [...foodlist];
    // food_list.map((item)=>{
    //  console.log(item.price)
    // })

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        logout
    }

    return (

        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StorContextProvider;