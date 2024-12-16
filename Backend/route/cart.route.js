import express from "express";
import multer from "multer";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from "../controller/cart.controller.js";

const router = express.Router();
const upload = multer();

router.post("/cart/:customerId", upload.none(), addToCart);
router.get("/cart/:customerId", upload.none(), getCart);
router.put("/cart/:customerId", upload.none(), updateCartItem);
router.delete("/cart/:customerId/:id", upload.none(), removeCartItem);

export default router;
