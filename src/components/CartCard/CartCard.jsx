import styles from "./CartCard.module.css";
import Button from "../Button/Button";
import { useOutletContext } from "react-router";

export default function CartCard({ item }) {
  const { shoppingCart, updateQuantity, removeFromCart, MAX_ITEM_QUANTITY } = useOutletContext();

  const itemInCart = shoppingCart.find((cartItem) => cartItem.id === item.id);
  const quantity = itemInCart.quantity;
  const isMaxedOut = quantity >= MAX_ITEM_QUANTITY;
  const isMinimum = quantity === 1;

  return (
    <div className={`${styles.card} flex-column`}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={item.images[0]}
          alt={item.title}
          width="400"
          height="400"
        />
      </div>
      <div className={`${styles.details} flex-column`}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.price}>Price: {item.price}$</p>
        <div className={`${styles.controls} flex-column`}>
          <div className={styles.counterContainer}>
            <p className={styles.counter}>Quantity: {quantity}</p>
          </div>
          <div className={`${styles.quantityButtons} flex-row`}>
            <Button
              className={styles.incrementButton}
              children="+"
              onClick={() => updateQuantity(item.id, 1)}
              disabled={isMaxedOut}
              aria-label="Increase quantity"
            />
            <Button
              className={styles.decrementButton}
              children="-"
              onClick={() => updateQuantity(item.id, -1)}
              disabled={isMinimum}
              aria-label="Decrease quantity"
            />
          </div>
          <div className={`${styles.removeButtonContainer} flex-row`}>
            <Button
              className={styles.removeButton}
              children="Remove"
              onClick={() => removeFromCart(item.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};