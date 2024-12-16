import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/api/book/${id}`);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <>
      <div className="mt-4 my-3 p-3">
      <div className="card w-full max-w-xs bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border hover:shadow-lg">
      <figure className="relative">
          <img src={book.image} alt="Shoes" className="w-full h-60 object-cover rounded-t-xl" />
        </figure>
  <div className="card-body p-4 h-full">
    <h2 className="card-title text-base font-semibold mb-2 line-clamp-2">{book.title}</h2>
    <div className="card-actions flex items-center justify-between space-x-4 mt-4">
      <div className="badge badge-outline text-xl font-semibold">{book.price}D</div>
      <div className="badge badge-outline text-lg">Số lượng: {book.stock}</div>
    </div>

    <p className="text-sm text-gray-500 mt-4 line-clamp-3">{book.description}</p>
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

export default BookDetail;