import imagekit from "../Config/imagekit.js";
import Product from "../Models/Product.js"
import fs from "fs";


// add product: /api/product/add
export const addProduct = async (req, res) => {
    try {
       let productData = JSON.parse(req.body.productData);

            productData.inStock =
                typeof productData.inStock === "boolean"
                    ? productData.inStock
                    : true;

            const images = req.files;

            const imageUrl = await Promise.all(
                images.map(async (item) => {
                    const result = await imagekit.upload({
                        file: fs.readFileSync(item.path),
                        fileName: item.originalname
                    });

                    return result.url;
                })
            );

            await Product.create({
                ...productData,
                image: imageUrl
            });

        res.json({
            success: true,
            message: "product added"
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};

//get product list :/api/product/List

export const productList= async(req,res)=>{

    try {
        const products=await Product.find({})
        res.json({success:true,products})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }

}

//get single product : /api/product/id
export const productById = async(req,res)=>{

    try {
        const { id} =req.body
        const product=await Product.findById(id);
        res.json({success:true,product})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }

}

//change product inStock : /api/product/stock

export const changeStock = async(req,res)=>{

    try {
        const { id,inStock}=req.body
        await Product.findByIdAndUpdate(id,{inStock})
        res.json({success:true,message:"stock Update"})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false ,message:error.message})
        
    }
    
}

//delete Product
export const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.json({
                success: false,
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(id);

        res.json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });

    }
};


// update product : /api/product/update/:id
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const productData = JSON.parse(req.body.productData);

        const product = await Product.findById(id);

        if (!product) {
            return res.json({
                success: false,
                message: "Product not found"
            });
        }

        await Product.findByIdAndUpdate(
            id,
            productData,
            { new: true }
        );

        res.json({
            success: true,
            message: "Product updated successfully"
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};