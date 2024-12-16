import React from "react";
import { Link } from "react-router-dom";
function Cards({ item }) {
  return (
    <>
      <div className="mt-4 my-3 p-3">
      <div className="card w-full max-w-xs bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border hover:shadow-lg">
      <Link to={`/book/${item._id}`}>
        <figure className="relative">
          <img src={item.image} alt="Shoes" className="w-full h-60 object-cover rounded-t-xl" />
        </figure>
      </Link>
  <div className="card-body p-4 h-full">
    <h2 className="card-title text-base font-semibold mb-2 line-clamp-2">{item.title}</h2>
    <div className="card-actions flex items-center justify-between space-x-4 mt-4">
      <div className="badge badge-outline text-xl font-semibold">{item.price}D</div>
      <div className="badge badge-outline text-lg">Số lượng: {item.stock}</div>
    </div>
    <div className="mt-4">
      <div className="cursor-pointer text-center px-4 py-2 rounded-full border-2 hover:bg-pink-500 hover:text-white duration-200">
        Mua
      </div>
    </div>
  </div>
</div>


</div>

    </>
  );
}

export default Cards;
