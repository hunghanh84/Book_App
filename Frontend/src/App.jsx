import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import BookDetail from "./courses/Bookdetail";
import AdminBooks from "./admin/AdminBooks";
import BookForm from "./admin/BookForm";
import AdminCategories from "./admin/AdminCategories";
import CategoryForm from "./admin/CategoryForm";
import AdminCustomers from "./admin/AdminCustomers";
import CustomerForm from "./admin/CustomerForm";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/book"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/admin/books" element={<AdminBooks />} />
          <Route path="/admin/books/new" element={<BookForm />} />
          <Route path="/admin/books/edit/:id" element={<BookForm />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/categories/new" element={<CategoryForm />} />
          <Route path="/admin/categories/edit/:id" element={<CategoryForm />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/customers/edit/:id" element={<CustomerForm />} />
          <Route path="/admin/customers/new" element={<CustomerForm />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
