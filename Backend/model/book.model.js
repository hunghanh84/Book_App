import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    stock: { type: Number, required: true, default: 0 }
});
const Book = mongoose.model('Book', bookSchema);
export default Book;
