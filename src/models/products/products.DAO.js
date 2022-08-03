import { CategoryModel } from "../categories";
import productsFactory from "./products.factory";

export const checkBodyProduct = async (req, res, next) => {
    const { name, description, stock, price, categoryId } = req.body;
    if (!name || !description || !stock || !price || !categoryId) {
        return res.status(400).json({
            msg: 'missing Body fields'
        });
    }

    try {
        const category = await CategoryModel.findById(categoryId);
        console.log(category)
        if (!category) {
            return res.status(400).json({
                msg: 'Category does not exists',
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            msg:'Category´s format it´s not valid'
        })
    }


    next()
};

export const getAllProducts = (req, res) => productsFactory().getAllProducts(req,res);

export const getProductById = (req, res) => productsFactory().getProductById(req, res);

export const createProduct = (req, res) => productsFactory().createProduct(req, res);

export const updateProduct = (req, res) => productsFactory().updateProduct(req, res);

export const deleteProduct = (req, res) => productsFactory().deleteProduct(req, res);