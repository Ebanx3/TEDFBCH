import { ProductModel } from "./products.model";
import { CategoryModel } from "../categories";
import productsDTO from "./products.DTO";

const getAllProducts = async (req,res) => {
    try{
        const items = await ProductModel.find();
        const itemsDTO = items.map(item => productsDTO(item))
        res.json({
            data:itemsDTO,
        });
    }
    catch(err){
        res.status(500).json({
            error:err.message,
            stack:err.stack,
        });
    }
};

const getProductById = async (req,res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        if(!product){
            res.status(400).json({
                msg:'Product not found',
            });
        }

        res.json({
            data:productsDTO(product),
        });
    }
    catch(err){
        res.status(500).json({
            error:err.message,
            stack:err.stack,
        });
    }
};

const createProduct = async (req,res) => {
    try{
        const {name,description,price,stock,categoryId} = req.body;

        const newProduct = await ProductModel.create({ name, description, price, stock, categoryId });

        res.json({
            msg:'Product created',
            data: productsDTO(newProduct)
        });
    }
    catch(err){
        res.status(500).json({
            error:err.message,
            stack:err.stack,
        });
    }
};

const updateProduct = async (req,res) => {
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
            data: productsDTO(productUpdated),
        });
    }
    catch(err){
        res.status(500).json({
            error:err.message,
            stack:err.stack,
        });
    }
};

const deleteProduct = async (req,res) =>{
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

const productsMongooseController = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

export default productsMongooseController;