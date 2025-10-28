import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, Table, ClipboardList, Users } from "lucide-react";
import styles from "../../styles/AdminSidebar.module.css";

export default function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <NavLink to="/admin" end className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>
        <BarChart3 size={20} />
      </NavLink>
      <NavLink to="/admin/tables" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>
        <Users size={20} />
      </NavLink>
      <NavLink to="/admin/orders" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>
        <ClipboardList size={20} />
      </NavLink>
      <NavLink to="/admin/menu" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ""}`}>
        <Table size={20} />
      </NavLink>
    </aside>
  );
}
