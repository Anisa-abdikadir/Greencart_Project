import express from 'express'
import authUser from "../middleWare/authUser.js";
import { GetAllOrders, getUserOrders, PlaceOrderCOD, PlaceOrderStripe } from '../Controller/OrderController.js';
import authSeller from "../middleWare/authSeller.js";

const orderRouter =express.Router();


orderRouter.post('/cod',authUser,PlaceOrderCOD)
orderRouter.get('/user',authUser,getUserOrders)
orderRouter.get('/seller',authSeller,GetAllOrders)
orderRouter.post('/stripe',authUser,PlaceOrderStripe)


export default orderRouter;