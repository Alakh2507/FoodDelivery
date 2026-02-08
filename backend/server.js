import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/db.js';
import './config/cloudinary.js';

import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// ✅ CORS: allow your frontend and admin panel
const allowedOrigins = [
  'http://localhost:5173', // frontend dev
  'http://localhost:5174', // admin dev
  'https://food-delivery-xi-gilt.vercel.app', // frontend prod
  'https://food-delivery-admin.vercel.app',   // admin prod
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // only if using cookies/auth
}));

// parse JSON
app.use(express.json());

// handle preflight requests
app.options('*', cors());

// DB connection
connectDB();

// Routes
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// test route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
