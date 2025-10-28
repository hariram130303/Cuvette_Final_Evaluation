import React, { useEffect, useState } from "react";
import { api } from "../../api/mockApi";
import OrderCard from "../../components/OrderCard";
import styles from "../../styles/AdminOrders.module.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.getOrders().then(setOrders);
  }, []);

  async function markDone(id) {
    await api.updateOrder(id, { status: "DONE" });
    setOrders(await api.getOrders());
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Order Line</h2>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} onDone={markDone} />
          ))}
        </div>
      </div>
    </div>
  );
}
