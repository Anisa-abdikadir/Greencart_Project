import express from "express";
import authSeller from "../middleWare/authSeller.js"
import { addProduct, changeStock, productById, productList ,deleteProduct,updateProduct} from "../Controller/ProductController.js";
import { Upload } from "../Config/Multer.js";

const productRouter = express.Router();

// imge fields ka file front end lagaso diro
productRouter.post('/add',Upload.array(["images"]),authSeller,addProduct)
productRouter.get('/list',productList)
productRouter.get('/id',productById)
productRouter.post('/stock',authSeller,changeStock)
productRouter.delete('/delete/:id', deleteProduct);
productRouter.put('/update/:id', Upload.array('images'),authSeller,updateProduct);

export default productRouter
