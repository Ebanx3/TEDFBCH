import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, checkBodyProduct } from '../models/products/products.DAO' 
import  Handler  from 'express-async-handler';

const router = Router();

router.get('/', Handler(getAllProducts));
router.get('/:id', Handler(getProductById));
router.post('/', checkBodyProduct ,Handler(createProduct));
router.put('/:id', Handler(updateProduct));
router.delete('/:id', Handler(deleteProduct));

export default router;