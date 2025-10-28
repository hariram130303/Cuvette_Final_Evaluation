import React from "react";
import styles from "../styles/OrdersCard.module.css";
import { Clock, BadgeCheck } from "lucide-react";
import forkKnife from "/assets/fork-knife.png";

export default function OrderCard({ order, onDone }) {
  const isProcessing = order.status === "PROCESSING";
  const isDone = order.status === "DONE";

  const statusClass = isProcessing
    ? styles.processing
    : isDone
    ? styles.done
    : styles.takeaway;

  const statusBoxStyle = isProcessing
    ? styles.processingBox
    : isDone
    ? styles.doneBox
    : styles.takeawayBox;

  return (
    <div className={`${styles.orderCard} ${statusClass}`}>
      {/* --- HEADER SECTION --- */}
<div className={styles.cardHeader}>
  <div className={styles.leftInfo}>
    <div className={styles.topRow}>
      <img src={forkKnife} alt="icon" className={styles.icon} />
      <div className={styles.orderId}># {order.id}</div>
    </div>
    {order.tableId && <div className={styles.table}>Table-{order.tableId}</div>}
    <div className={styles.time}>{order.time}</div>
    <div className={styles.itemsCount}>{order.items.length} Item</div>
  </div>

  <div className={`${styles.statusBox} ${statusBoxStyle}`}>
    <p
  className={`${styles.statusTitle} ${
    isDone
      ? styles.statusTitleDone
      : isProcessing
      ? styles.statusTitleProcessing
      : styles.statusTitleTakeaway
  }`}
>
  {isDone ? "Done" : isProcessing ? "Dine In" : "Take Away"}
</p>

    <p className={styles.statusSub}>
      {isDone ? "Served" : isProcessing ? "Ongoing: 4 Min" : "Not Picked up"}
    </p>
  </div>
</div>


      {/* --- ITEMS SECTION --- */}
      <div className={styles.itemsSection}>
        <p className={styles.setTitle}>1× Value Set Meals</p>
        <ul>
          {order.items.map((it, i) => (
            <li key={i}>
              {it.name}
            </li>
          ))}
        </ul>
      </div>

      {/* --- FOOTER BUTTON --- */}
      <div className={styles.footer}>
        {isDone ? (
          <button className={`${styles.actionBtn} ${styles.doneBtn}`}>
            Order Done <BadgeCheck size={16} />
          </button>
        ) : isProcessing ? (
          <button
            className={`${styles.actionBtn} ${styles.processingBtn}`}
            onClick={() => onDone(order.id)}
          >
            Processing <Clock size={16} />
          </button>
        ) : (
          <button className={`${styles.actionBtn} ${styles.takeawayBtn}`}>
            Order Done <BadgeCheck size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
