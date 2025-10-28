import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/ThankYou.module.css";

export default function ThankYou() {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    const redirect = setTimeout(() => navigate("/"), 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className={styles.thankYouPage}>
      <div className={styles.container}>
        <h2 className={styles.text}>Thanks For Ordering</h2>
        <div className={styles.circle}>✓</div>
        <p className={styles.redirect}>Redirecting in {count}</p>
      </div>
    </div>
  );
}
