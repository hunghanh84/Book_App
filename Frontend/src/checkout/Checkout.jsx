import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

function Checkout() {
  const [authUser] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { removeCart } = useCart();
  const selectedItems = location.state || []; // Lấy sản phẩm được chọn từ state

  const [shippingAddress, setShippingAddress] = useState(""); // Lưu địa chỉ giao hàng
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tính tổng tiền
  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    );
  };

  // Gửi yêu cầu tạo đơn hàng
  const handlePlaceOrder = async () => {
    if (!shippingAddress) {
      toast.error("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    setIsSubmitting(true);

    try {
      const customerId = authUser._id; // Bạn cần sửa để lấy ID khách hàng
      const books = selectedItems.map((item) => ({
        book: item.book._id,
        price: item.book.price,
        quantity: item.quantity,
      }));

      for (const item of selectedItems) {
        await removeCart(item._id);
      }

      await axios.post("http://localhost:4001/api/order", {
        customerId,
        books,
        shippingAddress,
      });

      toast.success("Đơn hàng của bạn đã được tạo thành công!");
      navigate("/course"); // Điều hướng về trang chủ hoặc nơi khác
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-28">
          <h1 className="text-2xl p-4 md:text-4xl text-center">Thanh toán</h1>
          {selectedItems.length > 0 ? (
            <div>
              <p>Bạn đang thanh toán cho {selectedItems.length} sản phẩm.</p>
              <div className="mt-4">
                {selectedItems.map((item) => (
                  <div
                    key={item.book._id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
                  >
                    {/* Image */}
                    <img
                      src={`${item.book.image}`}
                      alt={item.book.title}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />

                    {/* Product Title */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.book.title}
                      </h3>
                      <span className="block truncate w-[50%]">
                        {item.book.description}
                      </span>
                    </div>

                    {/* Product Price and Quantity */}
                    <div className="text-right">
                      <p className="text-lg text-gray-600">
                        {item.quantity} x{" "}
                        <span className="font-medium text-gray-900">
                          {item.book.price.toLocaleString("vi-VN")} đ
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold">
                  Tổng cộng: {calculateTotal().toLocaleString("vi-VN")} đ
                </h2>
              </div>

              {/* Form nhập địa chỉ giao hàng */}
              <div className="mt-6">
                <label
                  htmlFor="shippingAddress"
                  className="block text-sm font-medium"
                >
                  Địa chỉ giao hàng:
                </label>
                <input
                  id="shippingAddress"
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                  placeholder="Nhập địa chỉ giao hàng của bạn"
                />
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-400 active:bg-blue-800 text-white rounded disabled:opacity-50"
                >
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận mua hàng"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Không có sản phẩm nào được chọn để thanh toán.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
