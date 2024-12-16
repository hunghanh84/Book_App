import express from "express";
import { signup, login, getCustomers, updateCustomer, deleteCustomer, getCustomerById, createCustomer } from "../controller/customer.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
// API để xử lý khách hàng

router.get('/customer', getCustomers);
router.get('/customer/:id', getCustomerById);
router.put('/customer/:id', updateCustomer);
router.delete('/customer/:id', deleteCustomer);
router.post('/customer', createCustomer);

export default router;