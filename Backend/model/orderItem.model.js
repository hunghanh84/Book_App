import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
export default OrderItem;
