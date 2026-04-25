import styles from "./ProductCard.module.css"

function formatCategoryTitle(string) {
  return string
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ProductCard({ cardCategory, items }) {
  
  const cardTitle = formatCategoryTitle(cardCategory);

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{cardTitle}</h2>
      <div className={styles.imageGroup}>
        {items.map((item, id) => (
          <div key={id} className={styles.imageContainer}>
            <img className={styles.image} src={item.images[0]} alt={item.title} width={100}/>
          </div>
        ))}
      </div>
    </div>
  );
};