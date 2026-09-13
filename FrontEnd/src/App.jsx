import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import { Route, Routes, useLocation } from "react-router-dom"
// import Products from "./Pages/Products";
import {Toaster} from "react-hot-toast"
import Footer from "./Components/Footer"
import { useAppContext } from "./Context/AppContext"
import Login from "./Components/Login"
import All_Products from "./Pages/All_Products"
import ProductCategory from "./Pages/ProductCategory"
import ProductDetails from "./Pages/ProductDetails"
import Cart from "./Pages/Cart"
import AddAddress from "./Pages/AddAddress"
import MyOrder from "./Pages/MyOrder"
import SellerLogin from "./Components/SellerLogin"
import SellerLayout from "./Pages/seller/SellerLayout"
import AddProduct from "./Pages/seller/AddProduct"
import ProductList from "./Pages/seller/ProductList"
import Orders from "./Pages/seller/Orders"
import Loading from "./Pages/Loading"
import SellerProductDetails from "./Pages/seller/SellerProductDetails"

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller")
  const {showUserLogin,isSeller}= useAppContext();
  return (
    <div className="text-defualt min-h-screen text-gray-700  bg-white">
       {isSellerPath ? null :<Navbar/>}
       {showUserLogin ? <Login/> : null}
       <Toaster/>
      <div className={`${isSellerPath ? "" :"px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/"element={<Home/>}/>
          <Route path="/products"element={<All_Products/>}/>
          <Route path="/products/:category"element={<ProductCategory/>}/>
          <Route path="/products/:category/:id"element={<ProductDetails/>}/> //customer
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/add-address" element={<AddAddress/>}/>
          <Route path="/my-orders" element={<MyOrder/>}/>
          <Route path="/loader" element={<Loading/>}/>
          //seller pages
          <Route path="/seller" element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
             //seller
          <Route index element={isSeller ? <AddProduct/> : null}/>
            <Route path="product-list" element={<ProductList/>}/>
            <Route path="/seller/products/:id"element={<SellerProductDetails />}/>
            <Route path="/seller/products/edit/:id" element={<AddProduct />} />
            <Route path="products/:id" element={<SellerProductDetails />} />
                            <Route path="orders" element={<Orders/>} />


          </Route>
         




        </Routes>
      </div>
             {!isSellerPath && <Footer/>}
    </div>
  )
}
export default App