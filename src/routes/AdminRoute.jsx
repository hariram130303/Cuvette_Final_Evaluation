import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminMenu from "../pages/admin/AdminMenu";
import AdminTables from "../pages/admin/AdminTables";
import styles from "../styles/AdminRoute.module.css";

export default function AdminRoute() {
  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <main className={styles.content}>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="tables" element={<AdminTables />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  );
}
