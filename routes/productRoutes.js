import express from 'express'
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import formidable from "express-formidable"
import { createProduct, deleteProduct, getAllProduct, getPhoto, productFilter, singleProduct, updateProduct } from '../controllers/productController.js';
const router = express.Router();

router.post("/create-product",requireSignIn,isAdmin,formidable(),createProduct)
router.get("/get-product",getAllProduct)
router.get("/single-product/:slug",singleProduct)
router.get("/get-photo/:id",getPhoto)
router.delete("/delete-product/:id",requireSignIn,isAdmin,deleteProduct)
router.put("/update-product/:id",requireSignIn,isAdmin,formidable(),updateProduct)
router.post("/product-filter",productFilter)
export default router 