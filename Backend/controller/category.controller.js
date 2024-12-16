import Category from "../model/category.model.js";

// Lấy danh sách tất cả danh mục sách
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        console.log("Categories found:", categories);
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error getting categories:", error);
        res.status(500).json({ message: error.message });
    }
};

// Lấy danh mục theo id
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo mới danh mục sách
export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật danh mục sách
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa danh mục sách
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
