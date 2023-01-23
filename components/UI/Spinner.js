import React from "react";

// Styles
import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className="flex gap-2">
      <p className="text-2xl">Loading..</p>
      <div className={styles.spinner} />
    </div>
  );
}

export default Spinner;
