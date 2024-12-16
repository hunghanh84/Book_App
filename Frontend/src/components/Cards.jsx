import React from "react";
import { Link } from "react-router-dom";

function Cards({ item }) {
  const addToCart = () => {
    const cartItem = {
      _id: item._id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1
    };

    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItemIndex = currentCart.findIndex(item => item._id === cartItem._id);
    
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    alert('Đã thêm vào giỏ hàng!');
  };

  return (
    <div className="card h-full bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border hover:shadow-lg">
      <Link to={`/book/${item._id}`}>
        <figure className="relative">
          <img 
            src={item.image} 
            alt="Book" 
            className="w-full h-60 object-cover" 
          />
        </figure>
      </Link>
      <div className="card-body p-4">
        <h2 className="card-title text-base font-semibold mb-2 line-clamp-2 min-h-[3rem]">
          {item.title}
        </h2>
        <div className="card-actions flex items-center justify-between mt-auto">
          <div className="badge badge-outline text-xl font-semibold">
            {item.price}Đ
          </div>
          <div className="badge badge-outline text-lg">
            Số lượng: {item.stock}
          </div>
        </div>
        <div className="mt-4">
          <button 
            onClick={addToCart}
            className="w-full cursor-pointer text-center px-4 py-2 rounded-full border-2 hover:bg-pink-500 hover:text-white duration-200"
          >
            Mua
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
