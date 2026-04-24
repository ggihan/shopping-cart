import styles from "./Home.module.css";
import introImage from "../../assets/images/intro-image.webp"

export default function Home() {
  
  return (
    <div className={styles.home}>
      <div className={styles.intro}>
        <div className={styles.introCard}>
          <h1>Emazon</h1>
          <p>
            We provide the best products and services around the world!
            <br />
            Most reliable, secure, and fastest shipping there is.
            <br />
            Start your orders right here and now!
          </p>
        </div>
        <div className={styles.introImageContainer}>
          <img src={introImage} alt="" width={500} />
        </div>
      </div>
      <div className={styles.showcase}>
        
      </div>
    </div>
  );
};