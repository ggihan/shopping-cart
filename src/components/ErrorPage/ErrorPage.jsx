import styles from "./ErrorPage.module.css";
import { Link } from "react-router";

export default function ErrorPage() {
  
  return (
    <div className={styles.errorPage}>
      <h1 className={styles.errorMessage}>Oh no, this route doesn't exist!</h1>
      <Link to="/" className={styles.link}>
        Click here to return home!
      </Link>
    </div>
  );
};