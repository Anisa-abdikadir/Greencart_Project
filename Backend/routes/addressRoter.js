import express from 'express';
import authUser from '../middleWare/authUser.js';
import { addresses, getAddress } from '../Controller/addressController.js';

const addressRouter =express.Router();

addressRouter.post('/add',authUser,addresses);
addressRouter.get('/get',authUser,getAddress);

export default addressRouter;