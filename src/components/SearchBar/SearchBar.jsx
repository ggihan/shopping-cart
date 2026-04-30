import styles from "./SearchBar.module.css";

export default function SearchBar({ value, onSearchChange }) {

  return (
    <div className={styles.searchBar} role="search">
      <input
        className={styles.search}
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
};