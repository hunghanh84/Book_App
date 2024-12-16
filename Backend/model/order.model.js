import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  books: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      quantity: { type: Number, required: true },
    },
  ],
  orderDate: { type: Date, default: Date.now },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  shippingAddress: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
