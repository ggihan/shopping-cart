import styles from "./Shop.module.css";
import SearchBar from "../SearchBar/SearchBar";
import CategoryCard from "../CategoryCard/CategoryCard";
import { useOutletContext } from "react-router";
import { useState, useEffect } from "react";

export default function Shop() {
  const {productData} = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredItems = productData.filter(item => 
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const groupedFilteredItems = Object.groupBy(filteredItems, ({ category }) => category);
  
  return (
    <div>
      <h1 className={styles.title}>Shop</h1>
      <SearchBar value={searchTerm} onSearchChange={setSearchTerm} />
      <div className={styles.categoryGroup}>
        {Object.entries(groupedFilteredItems).map(([name, items]) => (
          <CategoryCard key={name} category={name} categoryItems={items} />
        ))}
      </div>
    </div>
  );
};