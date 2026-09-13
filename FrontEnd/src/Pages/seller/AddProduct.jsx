import React, { useState } from 'react';
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../Context/AppContext';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AddProduct = () => {

    // Get product ID from URL
    const { id } = useParams();

    // Check whether this page is Add or Update
    const isEditMode = Boolean(id);

    // Get product data sent from SellerProductDetails
    const location = useLocation();

    // Navigation
    const navigate = useNavigate();

    // Get axios from AppContext
    const { axios } = useAppContext();


    // Get product from navigate state
    const existingProduct = location.state?.product;


    // Product images
    const [files, setFile] = useState([]);


    // Product name
    const [name, setName] = useState(
        existingProduct?.name || ""
    );


    // Product description
    const [description, setDescription] = useState(
        existingProduct?.description?.join('\n') || ""
    );


    // Product category
    const [category, setCategry] = useState(
        existingProduct?.category || ""
    );


    // Product price
    const [price, setPrice] = useState(
        existingProduct?.price || ""
    );


    // Product offer price
    const [offerPrice, setOfferprice] = useState(
        existingProduct?.offerPrice || ""
    );


    // Loading state
    const [Addloading, setAddLoading] = useState(false);


    // Submit form
    const onsubmitHandle = async (event) => {

        event.preventDefault();

        try {

            setAddLoading(true);
            // Product data
            const productData = {

                name,
                description:
                 description.split('\n'),
                category,
                price,
                offerPrice

            };


            // Create FormData
            const formData = new FormData();


            // Add product data
            formData.append(
                'productData',
                JSON.stringify(productData)
            );


            // Add new images
            for (let i = 0; i < files.length; i++) {

                if (files[i]) {
                    formData.append(
                        'images',
                        files[i]
                    );

                }

            }


            let data;
            // UPDATE PRODUCT

            if (isEditMode) {

                const response = await axios.put(`/api/product/update/${id}`,
                    formData
                );

                data = response.data;

            }


            // ADD PRODUCT

            else {

                const response = await axios.post(
                    '/api/product/add',
                    formData
                );

                data = response.data;

            }


            // SUCCESS            

            if (data.success) {
                toast.success(data.message);
                navigate('/seller/product-list')


                // If UPDATE
                if (isEditMode) {

                    // Go back to ProductList
                    navigate('/seller/product-list');

                    return;

                }


                // If ADD
                setName('');
                setDescription('');
                setCategry('');
                setPrice('');
                setOfferprice('');
                setFile([]);

            }

            // ERROR FROM BACKEND

            else {

                toast.error(data.message);

            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                error.message
            );

        } finally {

            setAddLoading(false);

        }

    };

    const openProductListOutomatic = async(event)=>{

    }

    return (

        <div className="no-scrollbar flex h-[95vh] overflow-y-scroll flex-col flex-1 justify-between">

            <form
                onSubmit={onsubmitHandle}
                className="md:p-10 p-4 space-y-5 max-w-lg"
            >


                    {/* PRODUCT IMAGE */}

                <div>

                    <p className="text-base font-medium">
                        Product Image
                    </p>


                    <div className="flex flex-wrap items-center gap-3 mt-2">

                        {Array(4)
                            .fill('')
                            .map((_, index) => (

                                <label key={index}htmlFor={`image${index}`}>

                                    <input
                                        onChange={(e) => {
                                            const updatedFiles = [
                                                ...files
                                            ];

                                            updatedFiles[index] =e.target.files[0];
                                            setFile(
                                                updatedFiles
                                            );

                                        }}
                                        accept="image/*"
                                        type="file"
                                        id={`image${index}`} hidden/>


                                    <img
                                        className="max-w-24 cursor-pointer"
                                        src={
                                            files[index]
                                                ? URL.createObjectURL(
                                                    files[index]
                                                )
                                                : existingProduct?.image?.[index]
                                                    ? existingProduct.image[index] : assets.upload_area
                                        }
                                        alt="uploadArea"
                                        width={100}
                                        height={100}/>

                                </label>

                            ))}

                    </div>

                </div>


                    {/* PRODUCT NAME */}

                <div className="flex flex-col gap-1 max-w-md">

                    <label
                        className="text-base font-medium" htmlFor="product-name">
                        Product Name
                    </label>


                    <input
                        onChange={(e) => setName(e.target.value)
                        }
                        value={name}
                        id="product-name"type="text" placeholder="Type here"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        required/>

                </div>


                    {/* DESCRIPTION */}

                <div className="flex flex-col gap-1 max-w-md">

                    <label
                        className="text-base font-medium"htmlFor="product-description">
                        Product Description
                    </label>


                    <textarea
                        onChange={(e) =>setDescription(e.target.value)
                        }
                        value={description} id="product-description"rows={4}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                        placeholder="Type here"/>

                </div>


                    {/* CATEGORY */}

                <div className="w-full flex flex-col gap-1">

                    <label className="text-base font-medium"htmlFor="category">
                        Category
                    </label>


                    <select
                        onChange={(e) =>
                            setCategry(e.target.value)
                        }
                        value={category} id="category"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">

                        <option value="">
                            Select Category
                        </option>


                        {categories.map(
                            (item, index) => (

                                <option
                                    key={index} value={item.path} >{item.path}
                                </option>

                            )
                        )}

                    </select>

                </div>


                    {/* PRICE */}

                <div className="flex items-center gap-5 flex-wrap">


                    {/* Product Price */}
                    <div className="flex-1 flex flex-col gap-1 w-32">

                        <label className="text-base font-medium" htmlFor="product-price">
                            Product Price
                        </label>


                        <input
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                            value={price}id="product-price"type="number"placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            required/>

                    </div>


                    {/* Offer Price */}
                    <div className="flex-1 flex flex-col gap-1 w-32">

                        <label className="text-base font-medium"htmlFor="offer-price">
                            Offer Price
                        </label>


                        <input
                            onChange={(e) =>
                                setOfferprice(e.target.value)
                            }
                            value={offerPrice}id="offer-price" type="number" placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            required/>

                    </div>

                </div>


                    {/* ADD / UPDATE BUTTON */}

                <button
                    type="submit"
                    disabled={Addloading}
                    className={`px-8 py-2.5 bg-primary text-white font-medium rounded ${
                        Addloading
                            ? "opacity-60 cursor-not-allowed"
                            : "cursor-pointer"
                    }`}>

                    {Addloading ? "adding..." : isEditMode ? "Update" : "Add"
                    }

                </button>


            </form>

        </div>

    );

};

export default AddProduct;