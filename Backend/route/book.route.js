import express from 'express';
import { createBook, getBooks, updateBook, deleteBook, getBookById, upload } from '../controller/book.controller.js';

const router = express.Router();

// API để xử lý sách
router.post('/book', upload.single('image'), createBook);
router.get('/book', getBooks);
router.get('/book/:id', getBookById);
router.put('/book/:id', upload.single('image'), updateBook);
router.delete('/book/:id', deleteBook);

export default router;
