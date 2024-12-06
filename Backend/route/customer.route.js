import express from "express";
import { signup, login, getCustomers, updateCustomer, deleteCustomer } from "../controller/customer.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
// API để xử lý khách hàng

router.get('/customers', getCustomers);
router.put('/customer/:id', updateCustomer);
router.delete('/customer/:id', deleteCustomer);


export default router;