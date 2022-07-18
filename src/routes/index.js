import { Router } from 'express';
import userRouter from './users';
import productRouter from './products';
import cartRouter from './cart';
import categoriesRouter from './categories';

const router = Router();

router.use('/user',userRouter);
router.use('/product',productRouter);
router.use('/cart',cartRouter);
router.use('/categories', categoriesRouter);

export default router;