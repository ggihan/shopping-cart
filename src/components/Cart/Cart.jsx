import styles from "./Cart.module.css";
import CartCard from "../CartCard/CartCard";
import { useOutletContext, } from "react-router";
import { useMemo } from "react";

export default function Cart() {
  const { shoppingCart, productData } = useOutletContext();

  const cartItemsWithDetails = shoppingCart.map((cartItem) => {
    const productDetails = productData.find((p) => p.id === cartItem.id);

    return {
      ...productDetails,
      quantity: cartItem.quantity,
    };
  });

  const totalCost = useMemo(() => cartItemsWithDetails.reduce((accumulator, item) => {
    return accumulator + (item.price * item.quantity);
  }, 0), [cartItemsWithDetails]);

  return (
    <div className={`${styles.cart} flex-column`}>
      <h1 className={styles.title}>Shopping Cart</h1>
      <div className={`${styles.cardGroup} flex-column`}>
        {cartItemsWithDetails.map((item) => (
          <CartCard key={item.id} item={item} />
        ))}
      </div>
      <p className={`${styles.total} flex-row`}>Subtotal: {totalCost.toFixed(2)}$</p>
    </div>
  );
};