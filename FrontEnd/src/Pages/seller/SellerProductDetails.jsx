import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../Context/AppContext';
import toast from 'react-hot-toast';
import { IoIosArrowRoundBack } from "react-icons/io";


const SellerProductDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { products, currency, axios } = useAppContext();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // Find the selected product from AppContext
    const product = products.find((item) => item._id === id);


    // Delete product
    const handleDelete = async () => {

        try {

            setDeleteLoading(true);

            const { data } = await axios.delete(
                `/api/product/delete/${id}`
            );

            if (data.success) {

                toast.success(data.message);

                // Go back to ProductList after delete
                navigate('/seller/product-list');

            } else {
                toast.error(data.message);

            }

        } catch (error) {

            toast.error(error.message);

        } finally {

            setDeleteLoading(false);

        }

    };


    // If product is not found
    // if (!product) {

    //     return (
    //         <div className="p-10 text-center">

    //             <p className="text-gray-500">
    //                 Product not found
    //             </p>

    //             {/* <button
    //                 onClick={() => navigate('/seller/product-list')}
    //                 className="mt-4 px-5 py-2 bg-primary text-white rounded cursor-pointer">
    //                 Back to Products
    //             </button> */}

    //         </div>
    //     );

    // }


    return (

        <div className="p-4 md:p-10">

            {/* Back button */}
            <button
                onClick={() => navigate('/seller/product-list')}
                className="mb-6 px-4 py-2 border rounded  cursor-pointer items-center flex gap-1  hover:bg-gray-100">
                        <IoIosArrowRoundBack className='size={22}'  /> <span>Back</span>
            </button>


            <h2 className="text-2xl font-semibold mb-6">
                Product Details
            </h2>


            <div className="bg-white border rounded-xl p-6 max-w-4xl">

                <div className="flex flex-col md:flex-row gap-8">


                    {/* Product Image */}
                    <div className="w-full md:w-1/2">

                        <img
                            src={product.image?.[0]}
                            alt={product.name}
                            className="w-full h-80 object-cover rounded-lg border"
                        />

                    </div>


                    {/* Product Information */}
                    <div className="w-full md:w-1/2">

                        <h1 className="text-2xl font-semibold">
                            {product.name}
                        </h1>


                        <p className="text-gray-500 mt-2">
                            Category: {product.category}
                        </p>


                        {/* Price */}
                        <div className="mt-5">

                            <p className="text-gray-400 line-through">
                                {currency} {product.price}
                            </p>

                            <p className="text-2xl font-semibold text-primary">
                                {currency} {product.offerPrice}
                            </p>

                        </div>


                        {/* Stock */}
                        <div className="mt-5">

                            <p className="font-semibold">
                                Stock Status
                            </p>

                            <p
                                className={
                                    product.inStock
                                        ? "text-green-600 mt-1"
                                        : "text-primary-dull opacity-20"
                                }>
                                {product.inStock
                                    ? "In Stock"
                                    : "Out of Stock"}
                            </p>

                        </div>


                        {/* Description */}
                        <div className="mt-5">

                            <p className="font-semibold">
                                Description
                            </p>

                            <ul className="list-disc ml-5 mt-2 text-gray-500">

                                {product.description?.map(
                                    (desc, index) => (
                                        <li key={index}>
                                            {desc}
                                        </li>
                                    )
                                )}

                            </ul>

                        </div>


                        {/* Buttons */}
                        <div className="flex gap-3 mt-8">

                            {/* UPDATE BUTTON */}
                            <button
                                onClick={() =>
                                    navigate(
                                        `/seller/products/edit/${id}`,
                                        {
                                            state: {
                                                product: product
                                            }
                                        }
                                    )
                                }
                                className="px-5 py-2 bg-primary text-white rounded cursor-pointer hover:bg-primary-dull" >
                                Update
                            </button>


                            {/* DELETE BUTTON */}
                            <button
                                onClick={() =>
                                    setShowDeleteModal(true)
                                }
                                className="px-5 py-2  bg-primary text-white rounded cursor-pointer hover:bg-primary-dull" >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* DELETE CONFIRMATION MODAL */}
            {showDeleteModal && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">

                        <h3 className="text-xl font-semibold">
                            Delete Product
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Are you sure you want to delete this product?
                        </p>


                        <div className="flex justify-end gap-3 mt-6">

                            {/* Cancel */}
                            <button
                                onClick={() =>
                                    setShowDeleteModal(false)
                                }
                                className="px-5 py-2 border rounded cursor-pointer hover:bg-gray-100" >
                                Cancel
                            </button>


                            {/* Delete */}
                            <button
                                onClick={handleDelete}
                                disabled={deleteLoading}
                                className={`px-5 py-2 bg-red-500 text-white rounded ${
                                    deleteLoading
                                        ? "opacity-60 cursor-not-allowed"
                                        : "cursor-pointer hover:bg-red-600"
                                }`}>

                                {deleteLoading ? (

                                    <span className="flex items-center gap-2">

                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>

                                        Deleting...

                                    </span>

                                ) : (
                                    "Delete"
                                )}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
};

export default SellerProductDetails;