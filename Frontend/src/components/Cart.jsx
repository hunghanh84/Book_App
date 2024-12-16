import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Cart() {
  const [authUser] = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const { removeCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]); // Lưu sản phẩm được chọn

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4001/api/cart/${authUser._id}`
        );
        setCartItems(res.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, [authUser]);

  const updateQuantity = async (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    try {
      await axios.put(`http://localhost:4001/api/cart/${authUser._id}`, {
        id: id,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    setSelectedItems((prevSelected) =>
      prevSelected.filter((selectedId) => selectedId !== id)
    );
    removeCart(id);
  };

  const toggleSelectItem = (id) => {
    const selectedItem = cartItems.find((item) => item._id === id);
    setSelectedItems(
      (prevSelected) =>
        prevSelected.some((item) => item._id === id)
          ? prevSelected.filter((item) => item._id !== id) // Bỏ chọn nếu sản phẩm đã có trong selectedItems
          : [...prevSelected, selectedItem] // Chọn thêm
    );
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    );
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl p-4 md:text-4xl">Giỏ hàng</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                className="flex items-center bg-white p-4 rounded-lg shadow-md"
                key={item.book._id}
              >
                <input
                  type="checkbox"
                  className="mr-4 w-5 h-5"
                  checked={selectedItems.find(
                    (selectedItem) => selectedItem === item._id
                  )} // Kiểm tra nếu sản phẩm được chọn
                  onChange={() => toggleSelectItem(item._id)}
                />
                <img
                  src={`${item.book.image}`}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.book.title}</h2>
                  <p className="text-sm text-gray-600">
                    Giá: {item.book.price.toLocaleString("vi-VN")} đ
                  </p>
                  <div className="mt-2 flex items-center">
                    <label
                      htmlFor={`quantity-${item._id}`}
                      className="mr-2 text-sm text-gray-600"
                    >
                      Số lượng:
                    </label>
                    <input
                      id={`quantity-${item._id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, parseInt(e.target.value, 10))
                      }
                      className="w-16 px-2 py-1 border rounded-md text-center"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 mb-2">
                    Tổng:{" "}
                    {(item.book.price * item.quantity).toLocaleString("vi-VN")}{" "}
                    đ
                  </p>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="w-15 h-15 px-5 py-2 rounded text-white bg-red-500 text-lg hover:bg-red-400 active:bg-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Giỏ hàng của bạn đang trống.
          </p>
        )}

        <div className="mt-6 text-right">
          <h2 className="text-xl font-bold">
            Tổng cộng: {calculateTotal().toLocaleString("vi-VN")} đ
          </h2>
          {selectedItems.length > 0 ? (
            <Link
              to="/checkout"
              state={selectedItems} // Truyền danh sách sản phẩm được chọn sang trang thanh toán
            >
              <button className="hover:bg-blue-400 active:bg-blue-700 mt-4 mb-4 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg">
                Đặt hàng
              </button>
            </Link>
          ) : (
            <p className="mt-4 text-red-500 text-sm">
              Hãy chọn sản phẩm để đặt hàng.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
