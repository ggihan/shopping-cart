import styles from "./Nav.module.css";
import MiniShoppingCart from "../MiniShoppingCart/MiniShoppingCart";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";

export default function Nav({ totalItems }) {
  const [hideNav, setHideNav] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 150) {
          setHideNav(false);
        } 
        else if (currentScrollY > lastScrollY.current) {
          setHideNav(true);
        } 
        else {
          setHideNav(false);
        }

        lastScrollY.current = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
  return(
    <nav className={`${styles.nav} ${hideNav ? styles.hidden : ""}`} aria-label="Page links">
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
  )
}

