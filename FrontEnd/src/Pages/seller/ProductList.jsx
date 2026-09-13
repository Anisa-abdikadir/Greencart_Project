import React, { useEffect, useState } from 'react'
import {useAppContext}from'../..//Context/AppContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
   const { products, currency, fetchProducts } = useAppContext();
   const navigate = useNavigate();

//    loading
   const [loading,setLoading]=useState(true);
   const[error,setError]=useState();

  const handleRetry = async () => {
    setLoading(true);
    setError(false);

    try {
        await fetchProducts();

        await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
        console.log(error);
        setError(true);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    const loadProducts = async () => {
        setLoading(true);

        try {
            await fetchProducts();

            // Skeleton-ka ugu yaraan 2 seconds ha muuqdo
            await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (error) {
            console.log(error);
                setError(true);

        } finally {
            setLoading(false);
        }
    };

    loadProducts();
}, []);

   const toggleStock=async(id,inStock)=>{
    try {
        
        const{data}= await axios.post('/api/product/stock',{id,inStock});
        if (data.success) {
            fetchProducts();
            toast.success(data.message)
            
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
        
    }
   }
  return (
            <div className="no-scrollbar flex  h-[95vh] overflow-y-scroll flex-col flex-1 justify-between">

            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">All Products</h2>
                <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Product</th>
                                <th className="px-4 py-3 font-semibold truncate">Category</th>
                                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                    {loading ? (

                        // Skeleton Loading
                        [...Array(6)].map((_, index) => (
                            <tr
                                key={index}
                                className="border-t border-gray-500/20 animate-pulse" >
                                <td className="md:px-4 pl-2 md:pl-4 py-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-16 h-16 bg-gray-200 rounded"></div>

                                        <div className="h-4 w-32 bg-gray-200 rounded max-sm:hidden"></div>
                                    </div>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                </td>

                                <td className="px-4 py-3 max-sm:hidden">
                                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
                                </td>
                            </tr>
                        ))

                        ) : error ? (<tr>
                            <td colSpan="4" className="text-center py-10">

                                <p className="text-red-500 text-lg font-medium mb-2">
                                    Something went wrong
                                </p>

                                <p className="text-gray-500 text-sm mb-4">
                                    We couldn't load the products from the server.
                                </p>

                                <button
                                    onClick={handleRetry}
                                    className="bg-black text-white px-5 py-2 rounded">Try Again
                                </button>

                            </td>
                        </tr>

                    ) : products.length === 0 ? (

                      <tr>
                            <td
                                colSpan="4"className="text-center py-10">
                                <p className="text-gray-500 text-lg font-medium">
                                    No Products Found
                                </p>

                                <p className="text-gray-400 text-sm mt-1">
                                    There are no products available yet.
                                </p>
                            </td>
                        </tr>
                    ): (
                                        
                        // Real Products
                        products.map((product) => (
                          <tr
                            key={product._id}
                            onClick={() => navigate(`/seller/products/${product._id}`)}
                            className="border-t border-gray-500/20 cursor-pointer hover:bg-gray-100 transition">

                                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                    <div className="border border-gray-300 rounded overflow-hidden">
                                        <img
                                            src={product.image?.[0]}
                                            alt="Product" className="w-16"/>
                                    </div>

                                    <span className="truncate max-sm:hidden w-full">
                                        {product.name}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    {product.category}
                                </td>

                                <td className="px-4 py-3 max-sm:hidden">
                                    {currency}{product.offerPrice}
                                </td>

                                <td className="px-4 py-3">
                                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">

                                        <input
                                            onChange={() =>
                                                toggleStock(
                                                    product._id,
                                                    !product.inStock
                                                )
                                            }
                                            checked={product.inStock}
                                            type="checkbox" className="sr-only peer" />

                                        <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-primary transition-colors duration-200"></div>

                                        <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>

                                    </label>
                                </td>
                            </tr>
                        ))

                    )}
    
                            
                          
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  )
}

export default ProductList
