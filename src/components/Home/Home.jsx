import styles from "./Home.module.css";
import introImage from "../../assets/images/intro-image.600w.webp"
import ProductCard from "../ProductCard/ProductCard";
import { useOutletContext } from "react-router";

export default function Home() {
  const {randomHomeData, homeCategoryList} = useOutletContext();

  return (
    <div className={`${styles.home} flex-column`}>
      <div className={`${styles.intro} flex-column`}>
        <div className={`${styles.introCard} flex-column`}>
          <h1 className={styles.title}>Emazon</h1>
          <div className={`${styles.introText} flex-column`}>
            <p>We provide the best products and services around the world!</p>
            <hr />
            <p>Most reliable, secure, and fastest shipping there is.</p>
            <hr />
            <p>Start your orders right here and now!</p>
          </div>
        </div>
        <div className={styles.introImageContainer}>
          <img
            src={introImage}
            alt="" 
            width="600"
            height="400"
          />
        </div>
      </div>
      <div className={`${styles.showcaseContainer} flex-row`}>
        <div className={`${styles.showcase} flex-column`}>
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
    </div>
  );
};