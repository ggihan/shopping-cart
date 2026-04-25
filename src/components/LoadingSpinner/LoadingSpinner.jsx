import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <h2>Fetching products...</h2>
    </div>
  );
};