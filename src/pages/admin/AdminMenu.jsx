import React, { useEffect, useState } from "react";
import { api } from "../../api/mockApi";
import styles from "../../styles/AdminMenu.module.css";

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  async function fetchMenu() {
    const menu = await api.getMenu();
    setItems(menu);
  }

  // ✅ Filter items based on search
  const filteredItems = items.filter((it) =>
    it.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>
      {/* ✅ Minimal Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* ✅ Card Grid */}
      <div className={styles.grid}>
        {filteredItems.map((it) => (
          <div key={it.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              {it.imageUrl ? (
                <img src={it.imageUrl} alt={it.name} className={styles.image} />
              ) : (
                <div className={styles.placeholder}>Image</div>
              )}
            </div>
            <div className={styles.info}>
              <p><strong>Name:</strong> {it.name}</p>
              <p><strong>Description:</strong> {it.description || "—"}</p>
              <p><strong>Price:</strong> ₹{it.price}</p>
              <p><strong>Prep Time:</strong> {it.averagePreparationTime} Mins</p>
              <p><strong>Category:</strong> {it.category}</p>
              <p><strong>In Stock:</strong> {it.stock > 0 ? "Yes" : "No"}</p>
              <p><strong>Rating:</strong> {it.rating} ⭐</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
