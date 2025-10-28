import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import { CartProvider } from './context/CartContext';
import { UserProvider } from "./context/UserContext"; // ✅ import this
import UserDetailsPage from "./pages/user/UserDetails";
import styles from "./styles/App.module.css";

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
      <div className={styles.app}>
        <Routes>
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/menu/*" element={<UserRoute />} />
          
          <Route path="/" element={<UserDetailsPage />} />

          <Route path="*" element={<div style={{ padding: 20 }}>Not Found</div>} />
        </Routes>
      </div>
    </CartProvider>
    </UserProvider>
  );
}
