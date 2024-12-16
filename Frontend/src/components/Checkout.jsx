import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
    note: ""
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        ...formData,
        items: cartItems,
        total: total,
        status: "Pending"
      };

      await axios.post("http://localhost:4001/api/order", orderData);
      
      localStorage.removeItem('cart');
      
      toast.success('Đặt hàng thành công!');
      
      navigate("/book");
    } catch (error) {
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra khi đặt hàng');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen container mx-auto px-4 md:px-20 py-10 mt-20">
        <h1 className="text-2xl font-bold text-white mb-6">Thanh toán</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form thông tin */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Họ tên</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Địa chỉ</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Ghi chú</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              >
                Đặt hàng
              </button>
            </form>
          </div>

          {/* Thông tin đơn hàng */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm">Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                  <p>{item.price * item.quantity}Đ</p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <p className="text-xl font-semibold">
                  Tổng tiền: {total}Đ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout; 