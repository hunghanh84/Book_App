import express from 'express';
import { 
    createOrder, 
    getOrders, 
    getOrderById, 
    updateOrderStatus, 
    deleteOrder 
} from '../controller/order.controller.js';

const router = express.Router();

router.post('/order', createOrder);
router.get('/order', getOrders);
router.get('/order/:id', getOrderById);
router.put('/order/:id', updateOrderStatus);
router.delete('/order/:id', deleteOrder);

export default router;
