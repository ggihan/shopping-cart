import styles from "./Home.module.css";
import introImage from "../../assets/images/intro-image.webp"
import ProductCard from "../ProductCard/ProductCard";
import { useOutletContext } from "react-router";

export default function Home() {
  const {randomHomeData, homeCategoryList} = useOutletContext();

  return (
    <div className={styles.home}>
      <div className={styles.intro}>
        <div className={styles.introCard}>
          <h1 className={styles.title}>Emazon</h1>
          <p className={styles.introText}>
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
        {homeCategoryList.map((category) => {
          const items = randomHomeData[category];
          return (
            <ProductCard 
              key={category}
              cardCategory={category} 
              items={items} 
            />
          );
        })}
      </div>
    </div>
  );
};