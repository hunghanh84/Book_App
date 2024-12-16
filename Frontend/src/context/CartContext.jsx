import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [authUser] = useAuth(); // Lấy thông tin người dùng từ AuthContext
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartUpdated, setCartUpdated] = useState(false); // Thêm state để theo dõi thay đổi giỏ hàng

  // useEffect này sẽ chạy lại mỗi khi cartUpdated thay đổi
  useEffect(() => {
    if (authUser && authUser._id) {
      // Lấy số lượng sản phẩm trong giỏ từ server khi người dùng đã đăng nhập
      const fetchCartItemCount = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4001/api/cart/${authUser._id}`
          );
          if (response.data && Array.isArray(response.data.items)) {
            setCartItemCount(response.data.items.length);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };

      fetchCartItemCount();
    }
  }, [authUser, cartUpdated]); // Lấy lại khi cartUpdated thay đổi

  const addToCart = useCallback(
    async (bookId) => {
      if (!authUser || !authUser._id) {
        return;
      }

      try {
        await axios.post(`http://localhost:4001/api/cart/${authUser._id}`, {
          bookId,
          quantity: 1,
        });
        // Sau khi thêm sản phẩm, cập nhật state cartUpdated để trigger useEffect
        setCartUpdated((prev) => !prev); // Đảo giá trị để kích hoạt lại useEffect
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    },
    [authUser]
  ); // Chỉ thay đổi khi authUser thay đổi

  const removeCart = useCallback(
    async (id) => {
      if (!authUser || !authUser._id) {
        return;
      }

      try {
        await axios.delete(
          `http://localhost:4001/api/cart/${authUser._id}/${id}`
        );
        setCartUpdated((prev) => !prev); // Đảo giá trị để kích hoạt lại useEffect
      } catch (error) {
        console.error("Error removing cart item:", error);
      }
    },
    [authUser]
  );

  return (
    <CartContext.Provider value={{ cartItemCount, addToCart, removeCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
