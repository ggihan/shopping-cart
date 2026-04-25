import styles from "./ItemCard.module.css";
import Button from "../Button/Button";
import { useState } from "react";

export default function ItemCard({item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(q => q < 10 ? q + 1 : 10);
  const decrement = () => setQuantity(q => q > 1 ? q - 1 : 1);

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
    if (quantity > 10) {
      setQuantity(10);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue <= 10) {
      setQuantity(parsedValue);
    }
  };

  const handleAddToCart = () => {
    const finalQuantity = (quantity === "" || quantity < 1) ? 1 : quantity;
    onAddToCart(item, finalQuantity);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{item.title}</h3>
      <div className={styles.info}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={item.images[0]} alt={item.title} width={200}/>
        </div>
        <div className={styles.details}>
          <p className={styles.price}>{`${item.price}$`}</p>
          <p className={styles.rating}>{`${item.rating} / 5`}</p>
          <p className={styles.description}>{item.description}</p>
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.counterContainer}>
          <label htmlFor={`qty-${item.id}`}>Quantity:</label>
          <input 
            className={styles.counter}
            id={`qty-${item.id}`}
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            onKeyDown={(e) => ["e", "E", ".", "+", "-"].includes(e.key) && e.preventDefault()}
          />
        </div>
        <Button
          className={styles.incrementButton}
          children="+"
          onClick={increment}
        />
        <Button
          className={styles.decrementButton}
          children="-"
          onClick={decrement}
        />
        <Button
          className={styles.addToCartButton}
          children="Add to Cart"
          onClick={handleAddToCart}
        />
      </div>
    </div>
  );
};