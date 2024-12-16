import Order from "../model/order.model.js";
import Book from "../model/book.model.js";

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  try {
    const { customerId, books, shippingAddress } = req.body;

    // Tính tổng tiền đơn hàng
    let totalAmount = 0;
    for (const item of books) {
      const book = await Book.findById(item.book);
      if (book) {
        totalAmount += book.price * item.quantity;
      }
    }

    const newOrder = new Order({
      customer: customerId,
      books: books,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      status: "Pending",
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách đơn hàng
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer")
      .populate("books.book");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa đơn hàng
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
