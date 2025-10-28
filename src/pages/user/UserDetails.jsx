// src/pages/user/UserDetails.jsx
import React, { useState } from "react";
import styles from "../../styles/UserDetails.module.css";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

export default function UserDetails() {
  const { saveUserDetails } = useUser();
  const [form, setForm] = useState({
    name: "",
    persons: "",
    address: "",
    contact: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUserDetails(form);
    navigate("/menu"); // ✅ navigate to Menu after submit
  };

  return (
    <div className={styles.wrapper}>
      {/* 👇 Background Menu Page */}
      <div className={styles.background}>
        <Menu />
      </div>

      {/* 👇 Foreground Form Overlay */}
      <div className={styles.overlay}>
        <div className={styles.formCard}>
          <h2 className={styles.title}>Enter Your Details</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="full Name"
              className={styles.input}
              value={form.name}
              onChange={handleChange}
              required
            />
            <label>Number of Person</label>
            <input
              type="text"
              name="persons"
              placeholder="2, 4, 6"
              className={styles.input}
              value={form.persons}
              onChange={handleChange}
              required
            />
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="address"
              className={styles.input}
              value={form.address}
              onChange={handleChange}
              required
            />
            <label>Contact</label>
            <input
              type="tel"
              name="contact"
              placeholder="phone"
              className={styles.input}
              value={form.contact}
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.orderBtn}>
              Order Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
