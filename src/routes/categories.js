import { Router } from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../controllers/categories';
import Handler from 'express-async-handler';

const router = Router();

router.get('/', Handler(getAllCategories));
router.get('/:id', Handler(getCategoryById));
router.post('/', Handler(createCategory));
router.put('/:id', Handler(updateCategory));
router.delete('/:id', Handler(deleteCategory));

export default router;