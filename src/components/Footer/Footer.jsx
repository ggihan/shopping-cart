import styles from "./Footer.module.css";
import github from "../../assets/images/github.svg";
import linkedin from "../../assets/images/linkedin.svg";
import xcom from "../../assets/images/xcom.svg";

export default function Footer() {
  
  return (
    <footer>
      <nav className={styles.socials} aria-label="Social media links">
        <ul className="flex-row">
          <li>
            <a 
              href="https://github.com/GGihan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
            >
              <img src={github} alt="" role="presentation" />
            </a>
          </li>
          <li>
            <a 
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="linkedin homepage (opens in a new tab)"
            >
              <img src={linkedin} alt="" role="presentation" />
            </a>
          </li>
          <li>
            <a 
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Xcom homepage (opens in a new tab)"
            >
              <img src={xcom} alt="" role="presentation" />
            </a>
          </li>
        </ul>
      </nav>
      <p>@GGihan</p>
    </footer>
  );
};