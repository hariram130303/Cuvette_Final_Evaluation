//src/pages/user/Menu.jsx
import React, { useEffect, useRef, useState } from "react";
import CategoryChips from "../../components/CategoryChips";
import FoodCard from "../../components/FoodCard";
import { useCart } from "../../context/CartContext";
import { api } from "../../api/mockApi";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../../styles/Menu.module.css";


const categories = ["Pizza", "Burger", "Drink", "French fries", "Veggies"];

export default function Menu() {
  const [selected, setSelected] = useState("Pizza");
  const [items, setItems] = useState([]);
  const nav = useNavigate();
  const chipsRef = useRef(null);

  const { cart, addToCart, onUpdateQty } = useCart();

  useEffect(() => {
    api.getMenu(selected).then(setItems);
  }, [selected]);

  function scrollChips(direction) {
    const container = chipsRef.current;
    if (!container) return;
    const scrollAmount = container.offsetWidth * 0.6;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }

  function handleNext() {
    nav("/menu/checkout");
  }

  return (
    <div className={styles.menuWrapper}>
      <div className={styles.menuContainer}>
      <h3>Good evening</h3>
      <p>Place your order here</p>

      <div className={styles.searchRow}>
        <Search size={18} color="#999" style={{ marginRight: 8 }} />
        <input placeholder="Search" className={styles.search} />
      </div>

      <div className={styles.chipContainer}>
        <button className={styles.arrowBtn} onClick={() => scrollChips("left")}>
          <ChevronLeft size={20} />
        </button>

        <div ref={chipsRef} className={styles.chips}>
          <CategoryChips categories={categories} selected={selected} onSelect={setSelected} />
        </div>

        <button className={styles.arrowBtn} onClick={() => scrollChips("right")}>
          <ChevronRight size={20} />
        </button>
      </div>

      <h2>{selected}</h2>

      <div className={styles.grid}>
        {items.map((it) => (
          <FoodCard
            key={it.id}
            item={it}
            onAdd={() => addToCart(it)}
            cart={cart}
            onUpdateQty={onUpdateQty}
          />
        ))}
      </div>

      <button className={styles.nextBtn} onClick={handleNext}>
        Next
      </button>
    </div>
    </div>
  );
}
