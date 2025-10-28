import React from "react";
import styles from "../styles/FoodCard.module.css";

const FoodCard = ({ item, onAdd, cart, onUpdateQty }) => {
  // Check if this item already exists in the cart
  const cartItem = cart.find((ci) => ci.menuId === item.id);
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={item.imageUrl} alt={item.name} className={styles.image} />
      </div>

      <div className={`${styles.body} ${qty > 0 ? styles.activeBody : ""}`}>
        <div className={styles.textSection}>
          <div className={styles.title}>{item.name}</div>
          <div className={styles.priceRow}>
            <span className={styles.price}>₹ {item.price}</span>

            {qty === 0 ? (
              <button
                className={styles.addBtn}
                onClick={() => onAdd(item)}
              >
                +
              </button>
            ) : (
              <div className={styles.qtyControls}>
                <button onClick={() => onUpdateQty(cartItem.menuId, qty - 1)}>-</button>
                <span>{qty}</span>
                <button onClick={() => onUpdateQty(cartItem.menuId, qty + 1)}>+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
