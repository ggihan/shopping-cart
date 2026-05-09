import styles from "./CategoryCard.module.css";
import { useRef, useState } from "react";
import { formatCategoryTitle } from "../../utils/dataHelpers";
import Button from "../Button/Button";
import ItemCard from "../ItemCard/ItemCard";
import chevronUp from "../../assets/images/chevron-up.svg";
import chevronDown from "../../assets/images/chevron-down.svg";
import chevronLeft from "../../assets/images/chevron-left.svg";
import chevronRight from "../../assets/images/chevron-right.svg";

export default function CategoryCard({ category, categoryItems }) {
  const [hidden, setHidden] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_VISIBLE = 5;
  const cardTitle = formatCategoryTitle(category);

  const visibleItems = isExpanded 
    ? categoryItems 
    : categoryItems.slice(0, MAX_VISIBLE);

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 424;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth', 
      });
    }
  };

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
      <div className={styles.carouselWrapper}>
        <Button className={`${styles.navButton} ${styles.left}`} onClick={() => scroll('left')}>
          <img src={chevronLeft} alt="Scroll Left" width="40" height="40" />
        </Button>
        <div className={`${styles.itemCardGroup} flex-row`} ref={scrollRef}>
          {visibleItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
        <Button className={`${styles.navButton} ${styles.right}`} onClick={() => scroll('right')}>
          <img src={chevronRight} alt="Scroll Right" width="40" height="40" />
        </Button>
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