import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";

function Course() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/book");
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            Sách mở ra cánh cửa tri thức
          </h1>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {books.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
