// src/components/CookingInstructionsModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import styles from "../styles/CookingInstructionsModal.module.css";

export default function CookingInstructionsModal({ onClose, onNext }) {
  const [instruction, setInstruction] = useState("");

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <h3>Add Cooking instructions</h3>
        <div className={styles.textareaContainer}>
            <textarea className={styles.textarea} 
             onChange={(e) => setInstruction(e.target.value)} />
        </div>


        <p className={styles.note}>
          The restaurant will try its best to follow your request. However,
          refunds or cancellations in this regard won’t be possible.
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.nextBtn}
            onClick={() => {
              onNext(instruction);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
