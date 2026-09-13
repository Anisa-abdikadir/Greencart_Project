import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import ConnectDb from "./Config/db.js";
import UserRoute from "./routes/UserRoute.js";
import sellerRouter from "./routes/sellerRouter.js";
import productRouter from "./routes/productRouter.js";
import carRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoter.js";
import orderRouter from "./routes/orderRouter.js";
import { stripewebhook } from "./Controller/OrderController.js";

const app = express();

const port = process.env.PORT || 4000;

// Frontend URL
const allowedOrigins = process.env.FTONTEND_URL;
app.post('/stripe',express.raw({type:'application/json'}),stripewebhook)

// Middleware
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("API working");
});

app.use("/api/user", UserRoute);
app.use("/api/seller",sellerRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',carRouter)
app.use('/api/address',addressRouter);
app.use('/api/order', orderRouter)


// Start server only after MongoDB connects
const startServer = async () => {
  try {
    await ConnectDb();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
  console.error("Server could not start:", error.message);
  process.exit(1);


  }
};

startServer();