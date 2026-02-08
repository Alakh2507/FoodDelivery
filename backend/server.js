import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/db.js';
import './config/cloudinary.js'; // 🔥 VERY IMPORTANT

import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = 4000;

// middlewares
app.use(cors());
app.use(express.json());

// db connection
connectDB();

// routes
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send("hello world");
  
});

