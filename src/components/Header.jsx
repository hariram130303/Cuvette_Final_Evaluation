import React from "react";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <input
        type="text"
        placeholder="Filter..."
        className={styles.search}
      />
    </header>
  );
}
