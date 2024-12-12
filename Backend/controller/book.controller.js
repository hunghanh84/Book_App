import Book from "../model/book.model.js";
import Category from "../model/category.model.js";

// Tạo mới sách
export const createBook = async (req, res) => {
    try {
        const { title, price, categoryId, description, image, stock } = req.body;
        const category = await Category.findById(categoryId);
        
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const book = new Book({ title, price, category: categoryId, description, image, stock });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy danh sách tất cả sách
export const getBooks = async (req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật sách
export const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa sách
export const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
