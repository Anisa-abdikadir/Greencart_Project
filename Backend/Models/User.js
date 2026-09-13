import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    cartItems:{type:Object,default:{}},

},{minimize:false})

//hubinaya userka hore ujire hadi uujirin aburaa modle cusub
const User =mongoose.model.user ||mongoose.model('user',userSchema)

export default User;