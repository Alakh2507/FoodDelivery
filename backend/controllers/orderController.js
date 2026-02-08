import orderModel from "../models/orderModel.js";
import { userModel } from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const { items, amount, address } = req.body;
        const userId = req.body.userId;
        // console.log(userId)
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100, // convert ₹ to paise
            },
            quantity: item.quantity,
        }));

        // Optional delivery charge
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Fee",
                },
                unit_amount: 50 * 100,
            },
            quantity: 1,
        });
        //   after that goin any page 
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error in placing order" });
    }
};



//option  for verifyOrder
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body
    try {
        if (success == "true") {
            await orderModel.findOneAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Paid" })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

//user orders for frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.body.userId;
        const orders = await orderModel.find({ userId })

        res.json({ success: false, data: orders })
        console.log(orders)
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

//Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        // console.log(orders);
        return res.json({ success: true,data:orders });
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" });
    }
};

//api for updating order status
const updateStatus=async(req,res)=>{
    const orderId=req.body.orderId;
    const newStatus=req.body.status
   try{
    const response=await orderModel.findByIdAndUpdate(orderId,{atatus:newStatus})
    res.json({success:true,message:"Status Update "})

   }catch(err){
    console.log(err)
    res.json({success:false,message:"Error"})
   }
}

export { placeOrder, verifyOrder, userOrders, listOrders,updateStatus };
