//TableTile.jsx
import React from "react";
import styles from "../styles/AdminTables.module.css";

export default function TableTile({ t, onDelete, onReserve }) {
  return (
    <div className={`${styles.tile} ${t.status==="RESERVED"?styles.reserved:""}`}>
      <div className={styles.number}>{t.name}</div>
      <div className={styles.meta}>{t.seats} seats</div>
      <div className={styles.actions}>
        <button onClick={()=>onReserve(t.id)}>{t.status==="RESERVED"?"Unreserve":"Reserve"}</button>
        <button onClick={()=>onDelete(t.id)}>Delete</button>
      </div>
    </div>
  );
}
