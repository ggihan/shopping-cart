import styles from "./ProductCard.module.css"
import { formatCategoryTitle } from "../../utils/dataHelpers";

export default function ProductCard({ cardCategory, items }) {
  const cardTitle = formatCategoryTitle(cardCategory);

  return (
    <div className={styles.card}>
      <h2 className={`${styles.title} flex-row`}>{cardTitle}</h2>
      <div className={styles.imageGroup}>
        {items.map((item) => (
          <div key={item.id} className={styles.imageContainer}>
            <img
              className={styles.image}
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              width="200"
              height="200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};