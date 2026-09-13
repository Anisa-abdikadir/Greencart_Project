import User from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

//Register 
export const register =async(req,res)=>{
    try {
        const{name,email,password}=req.body;

        if (!name || !email ||!password) {
            return res.json({success:false,message:'missing Deteils'})
            
        }
        const existingUser =await User.findOne({email})
        if(existingUser){
            return res.json({success:false,message:'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password:hashedPassword}) //new user
        const token =jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'}) // this token expire in 7 day

            // Cookie: mel yar uu browsorka ku kaydiyo xogta website ubahanhy 
        res.cookie('token',token,{
            httpOnly:true, //prevent js to access cookie
            secure:process.env.NODE_ENV==='production', //use secure cookies in production
            sameSite:process.env.NODE_ENV === 'production'? 'none':'strict',  //CSRF protection
            maxAge:7* 24 *60 *60 *1000 , //cookie expiration time
        })

        return res.json({success:true,user:{email:user.email,name:user.name}})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
        
    }
}

//Loging user : /api/user/login

export const login = async(req,res)=>{
    try {
        const { email,password}=req.body
        if (!email || !password) {
            return res.json({success:false,message:'email and password are requied'})
            
        };
        const user = await User.findOne({email});
        if(!user){
            return res.json({success:false,message:'Invalid email or password  '})
        }

        const isMatch =await bcrypt.compare(password,user.password)
        if (!isMatch) 
            return res.json ({success:false,message:"inavalid email or password"})
            
            
        const token =jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'}) // this token expire in 7 day

            // Cookie: mel yar uu browsorka ku kaydiyo xogta website ubahanhy 
        res.cookie('token',token,{
            httpOnly:true, //prevent js to access cookie
            secure:process.env.NODE_ENV==='production', //use secure cookies in production
            sameSite:process.env.NODE_ENV === 'production'? 'none':'strict',  //CSRF protection
            maxAge:7* 24 *60 *60 *1000 , //cookie expiration time
        })

        return res.json({success:true,user:{email:user.email,name:user.name}})

        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
        
        
    }
}

//check Authorized : /api/use/isAuth
export const isAuth =async(req,res)=>{
    try {
        // const{userId}=req.body;
        const userId = req.userId;
        const user=await User.findById(userId).select("-password")
        return res.json({success :true,user})
        
    } catch (error) {
        console.log(error.message);
        res.json({success :false,message:error.message})
        
    }
}

//logout user /api/user/logout

export const logout =async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
        });
        res.json({success:true,message:"logged Out"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
        
    }
}