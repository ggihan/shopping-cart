import styles from "./Home.module.css";
import introImage from "../../assets/images/intro-image.webp"
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
            We provide the best products and services around the world!
            <br />
            <hr />
            Most reliable, secure, and fastest shipping there is.
            <br />
            <hr />
            Start your orders right here and now!
          </div>
        </div>
        <div className={styles.introImageContainer}>
          <img src={introImage} alt="" />
        </div>
      </div>
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
  );
};