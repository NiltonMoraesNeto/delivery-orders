import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import OrderDetails from "./pages/OrderDetails/order-details";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/order-details/:id" element={<OrderDetails />} />
    </Routes>
  );
};

export default AppRoutes;
