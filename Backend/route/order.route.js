import express from 'express';
import { createOrder, getOrders, updateOrderStatus, deleteOrder } from '../controller/order.controller.js';

const router = express.Router();

// API để xử lý đơn hàng
router.post('/order', createOrder);
router.get('/orders', getOrders);
router.put('/order/:id', updateOrderStatus);
router.delete('/order/:id', deleteOrder);

export default router;
