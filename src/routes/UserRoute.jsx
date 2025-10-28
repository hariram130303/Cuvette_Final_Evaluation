import React from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "../pages/user/Menu";
import Checkout from "../pages/user/Checkout";
import ThankYou from "../pages/user/ThankYou";

export default function UserRoute() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Routes>
        <Route index element={<Menu />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="thankyou" element={<ThankYou />} />
      </Routes>
    </div>
  );
}
