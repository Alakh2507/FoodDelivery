import { runInNewContext } from "vm";
import { userModel } from "../models/userModel.js";


//add items to user cart
const addToCart = async (req, res) => {
    try {
        let id = req.body.userId;
        console.log(id)
        let itemId = req.body.itemId;
        console.log(itemId)
        //Finds a single user document
        //Returns an object, not an arra
        let userData = await userModel.findOne({ _id:id })
        let cartData = await userData.cartData;
        if (!cartData[itemId]) {
            cartData[itemId] = 1
        } else {
            cartData[itemId] += 1
        }
        // update DB
        // console.log(cartData)
        const response = await userModel.findByIdAndUpdate(id, { cartData})
        res.json({ success: true, message: "Item added to cart" })


    } catch (err) {
        console.log(err)
        res.json({ success: false, message: "Error adding item" });
    }
}

//remove items form user cart
const removeFromCart = async (req, res) => {
    try {
        let id = req.body.userId;
        let itemId = req.body.itemId
        let userData = await userModel.findById({ _id:id })
        let cartData = await userData.cartData;
        if (cartData[itemId]) {
            cartData[itemId] -= 1
        }
        // ✔ If becomes zero → remove key completely
        if (cartData[itemId] <= 0) {
            delete cartData[itemId];
        }

        // update DB
        const response = await userModel.findByIdAndUpdate(id, { cartData })
        res.json({ success: true, message: "Item removed to cart" })


    } catch (err) {
        console.log(err)
        res.json({ success: false, message: "Error removing item" });
    }


}

// fetch user cart
const getCart = async (req, res) => {
  try {
    const id=req.body.userId
    // console.log(id);
    // get user data
    const userData = await userModel.findById(id);
    let cartData=await userData.cartData

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      cartData:cartData
    });

  } catch(err){
    console.log(err);
    res.json({
      success: false,
      message: "Error fetching cart"
    });
  }
};


export { addToCart, removeFromCart, getCart }