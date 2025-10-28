import React from "react";
import AdminSidebar from "../pages/admin/AdminSidebar";
import Header from "../components/Header";
import styles from "../styles/AdminLayout.module.css";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <AdminSidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
