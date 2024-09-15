import slugify from "slugify";
import Product from "../models/ProductSchema.js";
import fs from 'fs'

const createProduct = async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;

        switch(true){
            case !name:{
                return res.status(500).json({Error:"Name is required"})
            }
            case !description:{
                return res.status(500).json({Error:"description is required"})
            }
            case !price:{
                return res.status(500).json({Error:"price is required"})
            }
            case !category:{
                return res.status(500).json({Error:"category is required"})
            }
            case !quantity:{
                return res.status(500).json({Error:"quantity is required"})
            }
            case photo && photo.size > 1000000:{
                return res.status(400).json({message:"Photo is required and should less than 1 MB"})
            }
        }

        const products = new Product({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }

        await products.save();
        return res.status(200).json({
            message:"Product created successfully",
            success: true,
            products
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Error in creating message",
            success: false,
            error
        })
    }
}

const getAllProduct = async(req,res) =>{
    try {
        const product = await Product.
        find({})
        .select('-photo')
        .populate("category")
        .limit(12)
        .sort({createdAt:-1}

        )
        if(product){
            return res.status(200).json({
                countTotal: product.length,
                message: "All Product",
                success: true,
                product
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message:"Failed to create product",
            success : false,
        })

    }
}

const singleProduct = async(req,res) =>{
    try {
        const {slug} = req.params

        const product = await Product.findOne({slug}).select('-photo').populate("category")
        if(!product){
            res.status(500).json({
                message: "Product not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            product
        })
    } catch (error) {
        res.status(500).json({
            message:"Failedmmm to fetch product",
            success:false,
        })
    }
}

const getPhoto = async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id).select("photo")

        if(product.photo.data){
            res.set("Content-type",product.photo.contentType),
            res.status(200).send(product.photo.data)
        }
    } catch (error) {
        res.status(500).json({
            message:"Failed to fetch the photo",
            success:false
        })
    }
}

const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;

        await Product.findByIdAndDelete(id).select("-photo")
        res.status(200).json({
            message:"Product deleted successfully",
            success:true
        })
    } catch (error) {
        res.status(400).json({
            message:"Failed to delete the product",
            success:false
        })
    }
}

const updateProduct = async(req,res) =>{
    try {
        const {id} = req.params;
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;

        switch(true){
            case !name:{
                return res.status(500).json({Error:"Name is required"})
            }
            case !description:{
                return res.status(500).json({Error:"description is required"})
            }
            case !price:{
                return res.status(500).json({Error:"price is required"})
            }
            case !category:{
                return res.status(500).json({Error:"category is required"})
            }
            case !quantity:{
                return res.status(500).json({Error:"quantity is required"})
            }
            case photo && photo.size > 1000000:{
                return res.status(400).json({message:"Photo is required and should less than 1 MB"})
            }
        }

        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const product = await Product.findByIdAndUpdate(id,{...req.fields, slug:slugify(name)},{new:true});

        if(photo){
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save();

        res.status(200).json({
            message:"Product updated successfully",
            success:true,
            product
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Failed to update product",
            success: false,
            error: error.message,
        })
        
    }
}

const productFilter = async(req,res) =>{
    try {
        const {checked,radio} = req.body;

        console.log({checked,radio})
        let args = {};
        if(checked.length>0) args.category = checked;
        args.price = { $gte: radio[0], $lte: radio[1] };

        const products = await Product.find(args);
        res.status(200).json({
            message:"Filter Successfully",
            success:true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message:"Failed to filter the product",
            success:"false"
        })
    }
}
export {
    createProduct,
    getAllProduct,
    singleProduct,
    getPhoto,
    deleteProduct,
    updateProduct,
    productFilter
}