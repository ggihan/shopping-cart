import Logo from "../Logo/Logo";
import styles from "./Header.module.css";

export default function Header() {

  return (
    <header>
      <Logo className={styles.logo} />
    </header>
  );
};