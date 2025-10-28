import React, { useState } from "react";
import styles from "../../styles/AdminTables.module.css";
import { Trash2, Armchair } from "lucide-react";
import { FaChair } from 'react-icons/fa';

export default function AdminTables() {
  const initialCount = 30;
  const createInitialTables = (n) =>
    Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      name: `Table ${String(i + 1).padStart(2, "0")}`,
      chairs: 2,
    }));

  const [tables, setTables] = useState(createInitialTables(initialCount));
  const [showModal, setShowModal] = useState(false);
  const [newTable, setNewTable] = useState({ name: "", chairs: "2" });

  const handleAddTable = () => {
    setNewTable({ name: "", chairs: "2" });
    setShowModal(true);
  };

  const handleCreate = () => {
    const updated = [
      ...tables,
      {
        id: tables.length + 1,
        name: newTable.name
          ? newTable.name
          : `Table ${String(tables.length + 1).padStart(2, "0")}`,
        chairs: Number(newTable.chairs),
      },
    ];
    setTables(reindexTables(updated));
    setShowModal(false);
  };

  const handleDelete = (idToDelete) => {
    const filtered = tables.filter((t) => t.id !== idToDelete);
    setTables(reindexTables(filtered));
  };

  const reindexTables = (arr) =>
    arr.map((t, idx) => ({
      ...t,
      id: idx + 1,
      name: `Table ${String(idx + 1).padStart(2, "0")}`,
    }));

  return (
    <div className={styles.pageWrap}>
      <div className={styles.gridWrap}>
        <h2 className={styles.title}>Tables</h2>

        <div className={styles.grid}>
          {tables.map((table) => (
            <div key={table.id} className={styles.tableCard}>
              <button
                className={styles.deleteBtn}
                aria-label={`Delete ${table.name}`}
                onClick={() => handleDelete(table.id)}
                title="Delete"
              >
                <Trash2 size={14} />
              </button>

              <div className={styles.tableLabel}>Table</div>
              <div className={styles.tableNumber}>
                {String(table.id).padStart(2, "0")}
              </div>

              <div className={styles.tableFooter}>
                <span className={styles.chairIcon}>
                  <FaChair size={10} />
                </span>
                <span className={styles.chairCount}>
                  {String(table.chairs).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}

          {/* Add new table card */}
          <div
            className={styles.addCard}
            onClick={handleAddTable}
            role="button"
            title="Add table"
          >
            <span className={styles.plus}>+</span>
          </div>
        </div>
      </div>

      {/* Create Table Modal */}
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <label className={styles.modalLabel}>Table name (optional)</label>
            <input
              className={styles.modalInput}
              type="text"
              value={newTable.name}
              onChange={(e) =>
                setNewTable({ ...newTable, name: e.target.value })
              }
              placeholder={`Table ${String(tables.length + 1).padStart(2, "0")}`}
            />

            <label className={styles.modalLabel}>Chair</label>
            <select
              className={styles.modalSelect}
              value={newTable.chairs}
              onChange={(e) =>
                setNewTable({ ...newTable, chairs: e.target.value })
              }
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
            </select>

            <div className={styles.modalActions}>
              <button className={styles.createBtn} onClick={handleCreate}>
                Create
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
