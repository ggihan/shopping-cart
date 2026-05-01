import Logo from "../Logo/Logo";
import MiniShoppingCart from "../MiniShoppingCart/MiniShoppingCart";
import styles from "./Header.module.css";
import { Link } from "react-router";

export default function Header({ totalItems }) {

  return (
    <header>
      <Logo className={styles.logo} />
      <nav className={styles.nav}>
        <ul className={`flex-row ${styles.ul}`}>
          <li className={styles.link}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.link}>
            <Link to="shop">Shop</Link>
          </li>
          <li className={styles.lastLink}>
            <Link to="cart" className="inline-flex-row">
              <MiniShoppingCart size="5rem" totalItems={totalItems}/>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};