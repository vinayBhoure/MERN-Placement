import express from 'express';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import { connectDB } from './config/connectDB.js';
import { globalCatch } from './middlewares/error.js';
import NodeCache from 'node-cache';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import Stripe from 'stripe';
const app = express();
const PORT = 3000;

export const PHONE_PE_URI = "https://api-preprod.phonepe.com/apis/pg-sandbox";
export const MERCHANT_ID = "PGTESTPAYUAT86"; 
export const SALT_INDEX = 1
export const SALT_KEY = "96434309-7796-489d-8924-ab56988a6076"
export const payloadEndpoints = "/pg/v1/pay"

export const nodeCache = new NodeCache();
config({
    path: ".env"
})

// creating a static folder - uploads. Without this middlerware, it will be treated as apiroute.
app.use("/uploads", express.static("uploads")); 
app.use(express.json());
app.use(morgan("dev"));

app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );


app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
})

app.use('/api/v1/user', userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/dashboard", statsRoutes);

app.use(globalCatch);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

connectDB();