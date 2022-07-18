import { Router } from "express";
import { addProduct, createOrder, deleteProduct, getCart } from "../controllers/cart";

const router = Router();

router.get('/', getCart);
router.post('/add',addProduct);
router.post('/remove', deleteProduct);
router.post('/order', createOrder)
export default router;