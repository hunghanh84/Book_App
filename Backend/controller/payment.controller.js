import Payment from "../model/payment.model.js";
import Order from "../model/order.model.js";

// Tạo thanh toán mới
export const createPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod, paymentAmount } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const newPayment = new Payment({
            order: orderId,
            paymentMethod,
            paymentAmount,
            paymentStatus: "pending", // Trạng thái ban đầu là "pending"
        });

        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy danh sách thanh toán
export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('order');
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật trạng thái thanh toán
export const updatePaymentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const payment = await Payment.findByIdAndUpdate(req.params.id, { paymentStatus: status }, { new: true });
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
