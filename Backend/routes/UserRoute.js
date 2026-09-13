import express from"express"
import {isAuth,login, register,logout} from "../Controller/UserController.js"
import authUser from "../middleWare/authUser.js"

const UserRoute=express.Router();

UserRoute.post('/register',register)
UserRoute.post('/login',login)
UserRoute.get('/is_Auth',authUser,isAuth)
UserRoute.get('/logout',authUser,logout)

export default UserRoute