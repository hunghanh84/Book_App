import Customer from "../model/customer.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
    try {
        // Lấy dữ liệu từ body request
        const { fullname, phone, email, address, password } = req.body;

        // Kiểm tra xem email đã tồn tại trong CSDL chưa
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: "Customer already exists" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Tạo một Customer mới
        const newCustomer = new Customer({
            fullname,
            email,
            address,
            phone,
            password: hashedPassword,
        });

        // Lưu customer vào cơ sở dữ liệu
        await newCustomer.save();

        // Trả về kết quả
        res.status(201).json({
            message: "Customer created successfully",
            customer: {
                _id: newCustomer._id,
                fullname: newCustomer.fullname,
                email: newCustomer.email,
                address: newCustomer.address,
                phone: newCustomer.phone,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(400).json({ message: "Customer not found" });
        }

        const isMatch = await bcryptjs.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.status(200).json({
            message: "Login successful",
            customer: {
                _id: customer._id,
                fullname: customer.fullname,
                email: customer.email,
            },
        });
    } catch (error) {
        console.log("Login Error:", error);  // Log thêm thông tin chi tiết lỗi
        res.status(500).json({ message: "Internal server error" });
    }
};
// Lấy danh sách tất cả khách hàng
export const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật khách hàng
export const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa khách hàng
export const deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Customer deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};