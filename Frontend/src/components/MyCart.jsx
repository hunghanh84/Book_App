import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const MyCart = ({ cartItemCount }) => {
  return (
    <div className="relative">
      <Link
        to="/cart"
        className="text-gray-500 hover:text-gray-300 active:text-gray-700"
      >
        <FaShoppingCart size={24} />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default MyCart;
