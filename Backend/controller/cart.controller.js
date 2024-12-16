import Cart from "../model/cart.model.js";
import Book from "../model/book.model.js";
import mongoose from "mongoose";

// Add or Update Cart Items
export const addToCart = async (req, res) => {
  const { customerId } = req.params;
  const { bookId, quantity } = req.body;

  try {
    // Truy vấn sách từ cơ sở dữ liệu để lấy stock
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Kiểm tra nếu quantity trong giỏ hàng vượt quá stock của sách
    if (quantity > book.stock) {
      return res
        .status(400)
        .json({ message: "Quantity exceeds stock available" });
    }

    let cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        customer: customerId,
        items: [],
      });
    }

    // Check if the book already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.book.toString() === bookId
    );

    if (existingItem) {
      // Update quantity of existing item
      existingItem.quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({ book: bookId, quantity });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(201).json({ message: "Item added/updated in cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};

// Get Cart by Customer ID
export const getCart = async (req, res) => {
  const { customerId } = req.params;

  try {
    const cart = await Cart.findOne({ customer: customerId }).populate({
      path: "items.book",
      model: "Book",
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Update Item Quantity in Cart
export const updateCartItem = async (req, res) => {
  const { customerId } = req.params;
  const { id, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((item) => item._id.toString() === id);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ message: "Cart item updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
};

// Remove Item from Cart
export const removeCartItem = async (req, res) => {
  const { customerId, id } = req.params;

  try {
    const cart = await Cart.findOne({ customer: customerId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== id);
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ message: "Cart item removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing cart item", error });
  }
};
