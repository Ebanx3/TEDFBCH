import { Router } from "express";
import { addProduct, createOrder, deleteProduct, getCart } from "../controllers/cart";
import  Handler  from 'express-async-handler';

const router = Router();

router.get('/', Handler(getCart));
router.post('/add',Handler(addProduct));
router.post('/remove', Handler(deleteProduct));
router.post('/order', Handler(createOrder))
export default router;