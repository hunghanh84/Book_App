import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Carts from "./carts/ShoppingCart";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import Checkout from "./checkout/Checkout";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <CartProvider>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route
            path="/cart"
            element={authUser ? <Carts /> : <Navigate to="/signup" />}
          />
          <Route
            path="/checkout"
            element={authUser ? <Checkout /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster
          position="top-center"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
        />
      </div>
    </CartProvider>
  );
}

export default App;
