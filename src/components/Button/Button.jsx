import styles from "./Button.module.css";

export default function Button({ className, children, onClick}) {
  const combinedClassName = `${styles.baseButton} ${className || ""}`.trim();

  return (
    <button
      className={combinedClassName}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};