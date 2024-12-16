import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

function BookForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL nếu là chỉnh sửa
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    category: ""
  });

  useEffect(() => {
    // Nếu có id, fetch dữ liệu sách để chỉnh sửa
    if (id) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:4001/api/book/${id}`);
      setFormData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Tạo FormData để gửi file
      const formDataWithImage = new FormData();
      formDataWithImage.append('image', file);
      
      // Cập nhật preview ảnh
      setFormData({
        ...formData,
        imagePreview: URL.createObjectURL(file),
        imageFile: file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('categoryId', '675af263bd9b2d735b999e81');

      // Chỉ append file khi có file mới được chọn
      if (formData.imageFile) {
        formDataToSend.append('image', formData.imageFile);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      if (id) {
        const response = await axios.put(`http://localhost:4001/api/book/${id}`, formDataToSend, config);
        console.log('Update Response:', response.data);
      } else {
        const response = await axios.post("http://localhost:4001/api/book", formDataToSend, config);
        console.log('Create Response:', response.data);
      }
      navigate("/admin/books");
    } catch (error) {
      console.error('Error:', error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen container mx-auto px-4 md:px-20 py-10 mt-20">
        <h1 className="text-2xl font-bold text-white mb-6">
          {id ? "Chỉnh sửa sách" : "Thêm sách mới"}
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">Tên sách</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Giá</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Số lượng trong kho</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Hình ảnh</label>
              <div className="flex flex-col gap-4">
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required={!id} // Chỉ bắt buộc khi thêm mới
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {id ? "Cập nhật" : "Thêm mới"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/books")}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default BookForm; 