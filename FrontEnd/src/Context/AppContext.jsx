import { createContext ,useContext, useEffect, useState} from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { dummyAddress, dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL

export  const AppContext =createContext();

export const AppContextProvider =({children})=>{
    const currency = import.meta.env.VITE_CURRENCY;

    // access in any componens
    const navigate =useNavigate();
    const [user, setUser]=useState(null) //hdii aa raptid inu ku wydiyo login null ka dhig
    const [isSeller, setIsSeller] = useState(false)
        const [showUserLogin,setShowUserLogin] =useState(false)
        const [products , setProducts] = useState([])

        const [cartItems,setCartitems] =useState({})
        const[searchQuary, setSearchQuery] =useState({})

        //fecth seller status

        const fetchSeller=async()=>{
            try {
                const {data}=await axios.get('/api/seller/isAuth');
                if (data.success) {
                    setIsSeller(true)
                    
                }else{
                    setIsSeller(false)
                }
            } catch (error) {
                setIsSeller(false)
                
            }
        }

        //fetch user Auth status , user data and carts items

        const fetchUser = async()=>{
            try {
                const {data}= await axios.get('/api/user/is_Auth')
              
                    
                // }
                if (data.success) {
                    setUser(data.user);
                    setCartitems(data.user.cartItems || {});
                }
            } catch (error) {
                setUser(null)
                
            }

        }




// fetch all prroduct
    const fetchProducts = async()=>{
        try {
            const {data} = await axios.get('/api/product/list')
            if (data.success) {
                setProducts(data.products)
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }


    //add product to card
    const addToCart=(itemId)=>{
        let cartDate = structuredClone(cartItems || {})

        if (cartDate[itemId]) {
            cartDate[itemId] +=1;
            
        }
        else{
            cartDate[itemId]=1
        }
        setCartitems(cartDate);
        toast.success("Add to Cart")
        
    }

    //update cartItems quantity
const UpdateCartItem =(itemId,quantiity)=>{
    let cartDate = structuredClone(cartItems);
    cartDate[itemId]=quantiity;
    setCartitems(cartDate)
    toast.success("cart Upadate")
}

//Remove product from cart
const removeFormCart =(itemId)=>{
    let cartDate = structuredClone(cartItems);
    if(cartDate[itemId]){
        cartDate[itemId] -=1;
        if (cartDate[itemId] === 0) {
            delete cartDate[itemId]
            
        }
    }toast.success("remove cart")
    setCartitems(cartDate)
}

    //get cart items count only when click add count not when + click
    const getCartCount = () => {
    return Object.keys(cartItems).length;
};

    //total count car item
    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemsInfo= products.find((product)=>product._id === items);
           if (itemsInfo && cartItems[items] > 0) {
                totalAmount += itemsInfo.offerPrice  * cartItems[items]
            }

        }
        //  floor interget qata decimalka ayu turaa 2.3 hade tahy 2 bes kena
        return Math.floor(totalAmount*100)/100;
    }




    
    useEffect(() => {
    fetchUser()
    fetchSeller()
    fetchProducts()
}, [])

    //upadtte database cart items

    useEffect(()=>{
        const updateCart = async()=>{
            try {
                const{data} = await axios.post('/api/cart/update',{cartItems})
                if (!data.success) {
                    toast.error(data.message)
                    
                }
                
            } catch (error) {
                toast.error(error.message)
                
            }
        }
        if(user){
            updateCart()
        }

    },[cartItems])


    const value ={navigate,user,setUser, isSeller,
    setIsSeller,showUserLogin,setShowUserLogin,products,currency,addToCart,UpdateCartItem,
        removeFormCart,cartItems ,searchQuary,setSearchQuery ,getCartAmount,getCartCount,axios,
        fetchProducts,setCartitems
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext =()=>{
    return useContext(AppContext);
}