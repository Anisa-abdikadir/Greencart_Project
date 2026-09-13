import express from 'express'
import { isSellerAuth, sellerLogin, sellerLogout } from '../Controller/sellerController.js';
import authSeller from '../middleWare/authSeller.js';


const sellerRouter=express.Router();

sellerRouter.post('/login',sellerLogin);
sellerRouter.get('/isAuth',authSeller,isSellerAuth)
sellerRouter.get('/logout',sellerLogout)

export default sellerRouter;
