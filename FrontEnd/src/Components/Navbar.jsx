import React from "react";
import {NavLink} from 'react-router-dom'
import {assets} from "../assets/assets"
import {useAppContext} from "../Context/AppContext"
import { useEffect } from "react";
import { CiSettings } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
      const [open,setOpen] = React.useState(false)
      const {user,setUser, setShowUserLogin,navigate, setSearchQuery, searchQuary
        ,getCartCount,axios
      }= useAppContext()

      const logout = async()=>{

        try {
          const {data}= await axios.get('/api/user/logout')
          if (data.success) {
            toast.success(data.message)
             setUser(null);
             navigate('/')
            navigate('/seller/product-list')

            
          }else{
            toast.error(data.message)

          }
          
        } catch (error) {
          toast.error(error.message)
          
        }
       
      }

      useEffect(()=>{

        if(searchQuary.length > 0) {
          navigate("/products")
        }

      },[searchQuary])

    return (
        // <nav className="relative  flex items-center justify-between  px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white  transition-all">
          <nav className="relative z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white">

            <NavLink to='/' onClick={()=>setOpen(false)}>
                <img className="h-9" src={assets.logo} alt="dummyLogoColoored" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">

              <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Product</NavLink>

              
                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=>setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    
                    <img src={assets.search_icon} alt="search" className="h-4 w-4" />
                </div>

                      {/* <NavLink to='/seller'><CiSettings size={30}  /></NavLink> */}
                        <button
                        onClick={() => navigate('/seller')}
                        className="cursor-pointer" >
                        <CiSettings size={30} />
                    </button>

                <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
                  
                    <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                    {/* link cart */}
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>

                

                {!user ? (
                  <button onClick={()=>setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>)
                :
                (
                  <div className="relative group">
                    <img  src={assets.profile_icon} className="w-10" alt="" />
                    <ul className="hidden group-hover:block absolute top-10 right-0 bg-white
                    shadow border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">

                      <li onClick={()=>navigate("my-Orders")} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">My Order</li>
                      <li onClick={(logout)} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">logout</li>
                    </ul>
                    </div>
                )}

              </div>
              
            <div className="flex items-center gap-6 sm:hidden">

                       <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                    {/* link cart */}
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                        {getCartCount()}
                    </button>
                </div>

                 <button
                        onClick={() => navigate('/seller')}
                        className="cursor-pointer" >
                        <CiSettings size={30} />
                    </button>


              <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon  */}
                <img src={assets.menu_icon} alt="menu" />
            </button>
            </div>


            { open && (
            <div className={`${open ? 'flex' : 'hidden'} 
           absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm z-[100] md:hidden`}>
                <NavLink to="/" onClick={()=>setOpen(false)}>Home</NavLink>
                <NavLink to="/products" onClick={()=>setOpen(false)}>All Product</NavLink>

                {user &&
                   <NavLink to="/products" onClick={()=>setOpen(false)}>My Order</NavLink>
                }


                  {
                    !user ?(
                      <button onClick={()=>{
                        setOpen(false);
                        setShowUserLogin(true);
                      }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                    Login
                </button>

                    ):(
                      <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                    logout
                </button>
                    )
                  }
                
            </div>
)}

        </nav>
    )

}
export default Navbar