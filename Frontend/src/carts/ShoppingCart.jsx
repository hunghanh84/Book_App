import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
function ShoppingCart() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Cart />
      </div>
      <Footer />
    </>
  );
}

export default ShoppingCart;
