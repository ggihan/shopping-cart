import styles from "./ItemCard.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import { useOutletContext } from "react-router";

export default function ItemCard({ item }) {
  const { shoppingCart, addToCart, MAX_ITEM_QUANTITY } = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  const itemInCart = shoppingCart.find((cartItem) => cartItem.id === item.id);
  const currentInCartQty = itemInCart ? itemInCart.quantity : 0;
  const isMaxedOut = currentInCartQty >= MAX_ITEM_QUANTITY;

  const increment = () => setQuantity(q => q < MAX_ITEM_QUANTITY ? q + 1 : MAX_ITEM_QUANTITY);
  const decrement = () => setQuantity(q => q > 1 ? q - 1 : 1);

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
    if (quantity > MAX_ITEM_QUANTITY) {
      setQuantity(MAX_ITEM_QUANTITY);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setQuantity("");
      return;
    }
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue <= MAX_ITEM_QUANTITY) {
      setQuantity(parsedValue);
    }
  };

  const handleAddToCart = () => {
    const finalQuantity = (quantity === "" || quantity < 1) ? 1 : quantity;
    if (!isMaxedOut) {
      addToCart(item, finalQuantity);
    }
  };

  return (
    <div className={`${styles.card} flex-column`}>
      <h3 className={styles.title}>{item.title}</h3>
      <div className={`${styles.info} flex-column`}>
        <div className={`${styles.imageContainer} flex-row`}>
          <img
            className={styles.image}
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            width="200"
            height="200"
          />
        </div>
        <div className={`${styles.details} flex-column`}>
          <p className={styles.price}>{`Price: ${item.price}$`}</p>
          <p className={styles.rating}>{`Rating: ${item.rating} / 5`}</p>
          <p className={styles.description}>{item.description}</p>
        </div>
      </div>
      <div className={`${styles.controls} flex-column`}>
        <div className={`${styles.counterContainer} flex-row`}>
          <label htmlFor={`qty-${item.id}`}>Quantity: </label>
          <input 
            className={`${styles.counter} flex-row`}
            id={`qty-${item.id}`}
            type="number"
            min="1"
            max={MAX_ITEM_QUANTITY}
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            onKeyDown={(e) => ["e", "E", ".", "+", "-"].includes(e.key) && e.preventDefault()}
            disabled={isMaxedOut}
          />
        </div>
        <div className={`${styles.quantityButtons} flex-row`}>
          <Button
            className={styles.incrementButton}
            children="+"
            onClick={increment}
            disabled={isMaxedOut}
            aria-label="Increase quantity"
          />
          <Button
            className={styles.decrementButton}
            children="-"
            onClick={decrement}
            disabled={isMaxedOut}
            aria-label="Decrease quantity"
          />
        </div>
        <div className={`${styles.addToCartButtonContainer} flex-row`}>
          <Button
          className={styles.addToCartButton}
          children={isMaxedOut ? "Limit Reached" : "Add to Cart"}
          onClick={handleAddToCart}
          disabled={isMaxedOut}
        />
        </div>
      </div>
    </div>
  );
};