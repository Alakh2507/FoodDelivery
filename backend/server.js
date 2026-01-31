import express from 'express';
import cors from 'cors';
import connectDB  from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config' 
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
// app config
const app=express();
const port=4000;

// middlewares
app.use(cors());
app.use(express.json());

//db connection
connectDB();

//api endpoints
app.use('/api/food',foodRouter)
app.use("/image",express.static('uploads'));
//userRouter
app.use("/api/user",userRouter);
//cartRouter
app.use("/api/cart",cartRouter);
//oredr
app.use("/api/order" ,orderRouter)
app.get('/',(req,res)=>{
    res.send("hello world");
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})