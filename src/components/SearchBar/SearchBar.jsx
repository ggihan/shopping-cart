import styles from "./SearchBar.module.css";
import search from "../../assets/images/search.svg";

export default function SearchBar({ value, onSearchChange }) {

  return (
    <div className={`${styles.searchBar} flex-row`} role="search">
      <input
        className={styles.search}
        id="search-bar"
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <label htmlFor="search-bar">
        <img src={search} alt="" role="presentation" width={30}/>
      </label>
    </div>
  );
};