import React from "react";
import { Route, Routes } from "react-router-dom";
import AboutUs from "../pages/About";
import ContactUs from "../pages/Contact";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginRegister";
import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";

const Routing = () => {
  return (
    <div>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default Routing;
