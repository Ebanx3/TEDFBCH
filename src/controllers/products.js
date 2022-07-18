import { ProductModel } from "../models/products";
import { CategoryModel } from "../models/categories";

export const checkBodyProduct = async (req,res,next) => {
    const {name,description,stock,price,categoryId} = req.body;
    if(!name || !description || !stock || !price || !categoryId){
        return res.status(400).json({
            msg:'missing Body fields'
        });
    }

    const category = await CategoryModel.findById(categoryId);

    if(!category){
        return res.status(400).json({
            msg:'Category does not exists',
        });
    }

    next()
};

export const getAllProducts = async (req,res) => {
    try{
        const items = await ProductModel.find();
        res.json({
            data:items,
        });
    }
    catch(err){
        res.status(500).json({
            error:err.message,
            stack:err.stack,
        });
    }
};

export const getProductById = async (req,res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if(!product){
            res.status(400).json({
                msg:'Product not found',
            });
        }

        res.json({
            data:product,
        });
    }
    catch(err){
        res.status(500).json({
            error:err.message,
            stack:err.stack,
        });
    }
};

export const createProduct = async (req,res) => {
    try{
        const {name,description,price,stock,categoryId} = req.body;

        const newProduct = await ProductModel.create({ name, description, price, stock, categoryId });

        res.json({
            msg:'Product created',
            data: newProduct
        });
    }
    catch(err){
        res.status(500).json({
            error:err.message,
            stack:err.stack,
        });
    }
};

export const updateProduct = async (req,res) => {
    try{
        const { id } = req.params;

        const item = await ProductModel.findById(id);

        if(!item){
            res.status(404).json({
                msg:'Product not found',
            });
        }

        const productUpdated = await ProductModel.findByIdAndUpdate(id, req.body, {new:true});

        res.json({
            msg: ' Product updated',
            data: productUpdated,
        });
    }
    catch(err){
        res.status(500).json({
            error:err.message,
            stack:err.stack,
        });
    }
};

export const deleteProduct = async (req,res) =>{
    try{
        const { id } = req.params;
        await ProductModel.findByIdAndDelete(id);
        res.json({
            msg: 'Product deleted',
        });
    }
    catch(err){
        res.status(500).json({
            error:err.message,
            stack:err.stack,
        });
    }
};