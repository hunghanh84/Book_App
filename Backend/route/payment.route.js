import express from 'express';
import { createPayment, getPayments, updatePaymentStatus } from '../controller/payment.controller.js';

const router = express.Router();

// API để xử lý thanh toán
router.post('/payment', createPayment);
router.get('/payments', getPayments);
router.put('/payment/:id', updatePaymentStatus);

export default router;
