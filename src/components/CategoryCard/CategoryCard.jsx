import styles from "./CategoryCard.module.css";
import { useState } from "react";
import { formatCategoryTitle } from "../../utils/dataHelpers";
import Button from "../Button/Button";
import ItemCard from "../ItemCard/ItemCard";
import chevronUp from "../../assets/images/chevron-up.svg";
import chevronDown from "../../assets/images/chevron-down.svg";

export default function CategoryCard({ category, categoryItems }) {
  const [hidden, setHidden] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_VISIBLE = 5;
  const cardTitle = formatCategoryTitle(category);

  const visibleItems = isExpanded 
    ? categoryItems 
    : categoryItems.slice(0, MAX_VISIBLE);

  const handleToggle = () => {
    setHidden(prev => !prev);
  }

  return (
    <section className={`${styles.card} flex-column`}>
      <div className={`${styles.cardHeader} flex-row`}>
        <h2 className={styles.category}>{cardTitle}</h2>
        <div className={styles.toggleButtonContainer}>
          <Button 
            className={styles.toggleButton}
            onClick={handleToggle}
            aria-expanded={!hidden}
            aria-label={hidden ? `Expand ${cardTitle}` : `Collapse ${cardTitle}`}
          >
            <img 
              src={!hidden ? chevronUp : chevronDown} 
              alt=""
              width="40" 
              height="40" 
            />
          </Button>
        </div>
      </div>
      {!hidden && 
      <div className={`${styles.itemCardGroup} flex-row`}>
        {visibleItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      }
      {categoryItems.length > MAX_VISIBLE && !hidden && (
        <Button 
          className={styles.expandButton}
          onClick={() => setIsExpanded(!isExpanded)}
          children= {isExpanded ? "Show Less" : "Show More"}
        />
      )}
    </section>
  );
};