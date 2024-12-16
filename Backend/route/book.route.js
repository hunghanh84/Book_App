import express from 'express';
import { createBook, getBooks, updateBook, deleteBook,getBookById } from '../controller/book.controller.js';

const router = express.Router();

// API để xử lý sách
router.post('/bookcr', createBook);
router.get('/book', getBooks);
router.get('/book/:id', getBookById);
router.put('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

export default router;
