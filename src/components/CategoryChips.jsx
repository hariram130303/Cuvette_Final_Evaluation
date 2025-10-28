import React from "react";
// Import specific icons from different libraries
import { FaPizzaSlice, FaHamburger } from "react-icons/fa"; // Font Awesome
import { MdOutlineLocalDrink, MdOutlineFastfood } from "react-icons/md"; // Material Design
import { CiFries } from "react-icons/ci"; // Circled Icons
import styles from "../styles/Menu.module.css";

export default function CategoryChips({ categories, selected, onSelect }) {
  // Icon mapping
const categoryIcons = {
    Pizza: <FaPizzaSlice size={20} />,
    Burger: <FaHamburger size={20} />,
    Drink: <MdOutlineLocalDrink size={20} />,
    "French fries": <CiFries size={20} />,
    Veggies: <MdOutlineFastfood size={20} />,
  };

  return (
    <>
      {categories.map((cat) => (
        <div
          key={cat}
          className={`${styles.chip} ${selected === cat ? styles.active : ""}`}
          onClick={() => onSelect(cat)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            {/* This will now correctly find the icon for "French fries" */}
            {categoryIcons[cat] || null}
            <span style={{ fontSize: 12 }}>{cat}</span>
          </div>
        </div>
      ))}
    </>
  );
}