import styles from "./CategoryCard.module.css";
import { useState } from "react";
import { formatCategoryTitle } from "../../utils/dataHelpers";
import Button from "../Button/Button";
import ItemCard from "../ItemCard/ItemCard";

export default function CategoryCard({ category, categoryItems }) {
  const [hidden, setHidden] = useState(false);
  const cardTitle = formatCategoryTitle(category);

  const handleToggle = () => {
    setHidden(prev => !prev);
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.category}>{cardTitle}</h2>
      <Button 
        className={styles.toggleButton}
        children={hidden ? "show" : "hide"}
        onClick={handleToggle}
        aria-expanded={!hidden}
      />
      {!hidden && 
      <div className={styles.itemCardGroup}>
        {categoryItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      }
    </div>
  );
};