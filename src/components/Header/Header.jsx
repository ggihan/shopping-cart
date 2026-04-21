import Logo from "../Logo/Logo";
import styles from "./Header.module.css";
import { Link } from "react-router";

export default function Header() {

  return (
    <header>
      <Logo className={styles.logo} />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="shop">Shop</Link>
          </li>
          <li>
            <Link to="cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};