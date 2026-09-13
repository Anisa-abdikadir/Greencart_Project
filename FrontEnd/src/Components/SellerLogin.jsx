import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import axios from 'axios';
import toast from 'react-hot-toast';

const SellerLogin = () => {
    const {isSeller,setIsSeller,navigate}=useAppContext();
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const onSubmitHandler =async (event)=>{
        try {
            event.preventDefault();
            const {data} = await axios.post('/api/seller/login',{email,password})
            if (data.success) {
                setIsSeller(true)
                navigate('/seller')
                
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    useEffect(()=>{
        if(isSeller){
            navigate("/seller")

        }
    },[isSeller])
  return !isSeller && (
    <form onSubmit={onSubmitHandler} className='min-h-screen w-screen flex items-center  justify-center text-sm text-gray-600'>

        <div className='flex flex-col gap-6   items-center justify-center p-8 py-12  min-w-80 sm:min-w-88
        rounded-lg shadow-xl border border-gray-200'>

            <p className='text-2xl  font-medium m-auto'><span className='text-primary'>Seller</span>
             <span >Login</span></p>

            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Enter Your Email' required
                className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'/>
 
            </div>

            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Enter Your Password' required
                className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'/>
            </div>

            <button type="submit" className='bg-primary text-white w-full py-2  rounded-md cursor-pointer'>Login</button>

        </div>

    

    </form>
  )
}

export default SellerLogin
