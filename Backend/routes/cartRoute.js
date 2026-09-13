import express from "express";
import authUser from "../middleWare/authUser.js";
import { UpdateCart } from "../Controller/CartController.js";


const carRouter = express.Router();

carRouter.post('/update',authUser,UpdateCart)

export default carRouter;