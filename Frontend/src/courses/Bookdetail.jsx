import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      <Navbar />

      <div className="min-h-screen container mx-auto px-4 md:px-20 py-10 mt-20">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Phần hình ảnh */}
          <div className="md:w-1/3">
          <img 
              src={`/images/${book.image}`}
              alt={book.title} 
              className="w-full h-[400px] rounded-lg shadow-lg object-cover"
            //   onError={(e) => {
            //     console.log("Image load error:", e);
            //     e.target.src = "placeholder-image-url"; // URL ảnh placeholder khi load lỗi
            //   }}
            />
          </div>

          {/* Phần thông tin chi tiết */}
          <div className="md:w-2/3 space-y-6">
            <h1 className="text-3xl font-bold text-white dark:text-white">
              {book.title}
            </h1>
            
            <div className="flex gap-4 flex-wrap">
              <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full font-semibold">
                Giá: {book.price}Đ
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                Kho: {book.stock} cuốn
              </span>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold text-white">Mô tả sách:</h2>
              <p className="text-white dark:text-white">
                {book.description}
              </p>
            </div>

            <button className="w-full md:w-auto px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition duration-300 font-semibold">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookDetail;