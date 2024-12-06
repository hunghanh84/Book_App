import express from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controller/category.controller.js';

const router = express.Router();
// Example routes for categories
router.get('/', (req, res) => {
  res.send('Get all categories');
});

router.post('/', (req, res) => {
  res.send('Create a new category');
});
// API để xử lý danh mục sách
router.post('/category', createCategory);
router.get('/categories', getCategories);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

export default router;
