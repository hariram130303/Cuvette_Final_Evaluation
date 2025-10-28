// src/pages/user/Checkout.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/mockApi";
import styles from "../../styles/Checkout.module.css";
import CookingInstructionsModal from "../../components/CookingInstructionsModal";
import { useCart } from "../../context/CartContext";
import { motion as Motion, useMotionValue } from "framer-motion";
import { Search, MapPin, Clock, X, Minus, Plus, ArrowRight } from "lucide-react";

export default function Checkout() {
  const nav = useNavigate();
  const { 
    cart, 
    updateQty, 
    clearCart, 
    totalPrice 
  } = useCart();

  const [type, setType] = useState("DINE_IN");
  const [notes, setNotes] = useState("");
  const [showModal, setShowModal] = useState(false);

  const total = totalPrice;
  const deliveryCharge = 50;
  const tax = Math.round(total * 0.025);
  const grandTotal = total + deliveryCharge + tax;

  const x = useMotionValue(0);
  const containerRef = useRef(null);

  async function placeOrder() {
    const order = {
      id: `order-${Date.now()}`,
      type,
      tableId: type === "DINE_IN" ? 1 : null,
      items: cart,
      status: "PROCESSING",
      chefAssigned: null,
      timestamp: new Date().toISOString(),
      processingEndAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      notes,
    };
    await api.createOrder(order);
    clearCart();
    nav("/menu/thankyou");
  }

  return (
    <div className={styles.checkoutContainer}> 
      <h3>Good evening</h3>
      <p>Place your order here</p>
      <div className={styles.searchRow}>
            <Search size={36} color="#A8A8A8" style={{ marginRight: 8 }} />
            <input placeholder="Search" className={styles.search} />
      </div>
      <div className={styles.cartCard}>
        {cart.map((item) => (
          <div key={item.menuId} className={styles.itemRow}>
            <img
              src={item.imageUrl}
              alt={item.name}
            />
            <div className={styles.itemInfo}>
              <div className={styles.itemHeader}>
                <h4>{item.name}</h4>
                <X
                  size={20}
                  className={styles.removeBtn}
                  onClick={() => updateQty(item.menuId, 0)}
                />
              </div>
              <p>₹ {item.price}</p>
              <div className={styles.qtyControls}>
                <button onClick={() => updateQty(item.menuId, item.qty - 1)}>
                  <Minus size={12} />
                </button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.menuId, item.qty + 1)}>
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Cooking Instructions Modal Trigger */}
      <p
        style={{
          fontSize: "14px",
          color: "#b8a9a9",
          borderBottom: "1px dashed #b8a9a9",
          display: "inline-block",
          cursor: "pointer",
          marginTop: "12px"
        }}
        onClick={() => setShowModal(true)}
      >
        Add cooking instructions (optional)
      </p>

      {showModal && (
        <CookingInstructionsModal
          onClose={() => setShowModal(false)}
          onNext={(text) => {
            setNotes(text);
            setShowModal(false);
          }}
        />
      )}


      <div
          className={`${styles.typeSwitch} ${
            type === "TAKEAWAY" ? styles.takeaway : ""
          }`}
        >
          <button
            onClick={() => setType("DINE_IN")}
            className={type === "DINE_IN" ? styles.active : ""}
          >
            Dine In
          </button>
          <button
            onClick={() => setType("TAKEAWAY")}
            className={type === "TAKEAWAY" ? styles.active : ""}
          >
            Take Away
          </button>
        </div>

      <div className={styles.billSection}>
        <div className={styles.billRow}>
          <span>Item Total</span>
          <span>₹ {total.toFixed(2)}</span>
      </div>

  {/* Show delivery charge only for TAKEAWAY */}
  {type === "TAKEAWAY" && (
    <div className={styles.billRow}>
      <span>Delivery Charge</span>
      <span>₹ {deliveryCharge}</span>
    </div>
  )}

  <div className={styles.billRow}>
    <span>Taxes</span>
    <span>₹ {tax}</span>
  </div>

  <div className={styles.billRowGrand}>
    <span>Grand Total</span>
    <span>
      ₹{" "}
      {type === "TAKEAWAY"
        ? grandTotal.toFixed(2)
        : (total + tax).toFixed(2)}
    </span>
  </div>
</div>

<div className={styles.deliveryInfo}>
  <div className={styles.details}>
    <h4>Your details</h4>
    <p>Divya Sigatapu, 9109190109</p>
  </div>

  {/* Show address + delivery time only for TAKEAWAY */}
  {type === "TAKEAWAY" && (
    <div className={styles.infoRow}>
      <div className={styles.infoItem}>
        <MapPin size={16} />
        <span>
          Delivery at Home - Flat no: 301, SVR Enclave, Hyper Nagar
        </span>
      </div>
      <div className={styles.infoItem}>
        <Clock size={16} />
        <span>Delivery in 42 mins</span>
      </div>
    </div>
  )}
</div>


      {/* Swipe to Order Section */}
<div className={styles.swipeContainer} ref={containerRef}>
  <Motion.div
    className={styles.swipeDragger}
    drag="x"
    dragConstraints={containerRef}
    dragElastic={0.1}
    style={{ x }}
    onDragEnd={(event, info) => {
      const containerWidth = containerRef.current.offsetWidth;
      if (info.offset.x > containerWidth * 0.6) {
        placeOrder(); // Trigger order
      } else {
        x.set(0); // Snap back
      }
    }}
  >
    <ArrowRight size={20} />
  </Motion.div>
  <span className={styles.swipeText}>Swipe to Order</span>
</div>


    </div>
  );
}
